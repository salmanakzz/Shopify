// user post operations

const { USER_COLLECTION } = require("../../config/collections");
const post = require("../../config/models/postModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const user = require("../../config/models/userModel");

const crypto = require("crypto");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_USER_ACCESS,
    secretAccessKey: process.env.BUCKET_USER_SECRET,
  },
  region: process.env.BUCKET_REGION,
});

const fetchAllPostsFunc = async () => {
  const posts = await post.aggregate([
    {
      $lookup: {
        from: USER_COLLECTION,
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        user: 1,
        posts: 1,
      },
    },
    { $unwind: "$posts" },
    {
      $sort: {
        "posts.date": -1,
      },
    },
  ]);
  for (const post of posts) {
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: post.posts.img[0],
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    post.imageUrl = url;

    if (post.user[0]?.profilePicture) {
      const getObjectParams2 = {
        Bucket: process.env.BUCKET_NAME,
        Key: post.user[0].profilePicture,
      };
      const command2 = new GetObjectCommand(getObjectParams2);
      const url2 = await getSignedUrl(s3, command2, { expiresIn: 60 });
      post.user[0].profilePictureUrl = url2;
    }
  }
  return posts;
};

module.exports = {
  // function for submitting user post
  submitUserPost: (body, file) => {
    return new Promise(async (resolve, reject) => {
      const { userId, desc } = body;
      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");

      const imageName = randomImageName();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command).catch((err) => {
        console.log(err);
      });

      const postData = {
        userId,
        posts: [
          {
            img: [imageName],
            desc: desc,
            likes: [],
            comment: [],
            date: new Date(),
          },
        ],
      };

      const postDataPush = {
        img: [imageName],
        desc: desc,
        likes: [],
        comment: [],
        date: new Date(),
      };

      const userPost = await post.findOne({ userId });
      userPost
        ? post
            .updateOne({ userId }, { $push: { posts: postDataPush } })
            .then(() => {
              const posts = fetchAllPostsFunc();
              resolve(posts);
            })
            .catch((err) => {
              reject({ status: "error", error: err, postAdded: false });
            })
        : post
            .create(postData)
            .then(() => {
              const posts = fetchAllPostsFunc();
              resolve(posts);
            })
            .catch((err) => {
              reject({ status: "error", error: err, postAdded: false });
            });
    });
  },

  // function for getting all posts
  fetchAllPosts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const posts = fetchAllPostsFunc();
        resolve(posts);
      } catch (err) {
        reject({ status: "error", fetchAllPosts: false, error: err });
      }
    });
  },

  //userPost delete operations
  deleteUserPost: (userId, postId) => {
    return new Promise(async (resolve, reject) => {
      const userPost = await post.aggregate([
        { $match: { userId: ObjectId(userId), "posts._id": ObjectId(postId) } },
        {
          $unwind: "$posts",
        },
        { $match: { "posts._id": ObjectId(postId) } },
      ]);
      if (!userPost || userPost.length < 1) {
        reject({
          status: "error",
          error: "Post not found",
          postDeleted: false,
        });
        return;
      }
      const image = userPost[0].posts.img[0];
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: image,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
      post
        .updateOne(
          { userId, "posts._id": postId },
          { $pull: { posts: { _id: postId } } }
        )
        .then(() => {
          resolve({ status: "ok", postDeleted: true });
        })
        .catch((err) => {
          reject({ status: "error", postDeleted: false, error: err });
        });
    });
  },

  // userPost edit operations
  editUserPost: (userId, postId, newDesc) => {
    return new Promise((resolve, reject) => {
      post
        .updateOne(
          { userId, "posts._id": postId },
          { $set: { "posts.$.desc": newDesc } }
        )
        .then(() => {
          resolve({ status: "ok", postEdited: true });
        })
        .catch((err) => {
          reject({ status: "error", postEdited: false, error: err });
        });
    });
  },

  // userPost like operations
  likeUserPost: (userId, postId, postUserId) => {
    return new Promise(async (resolve, reject) => {
      post
        .updateOne(
          { postUserId, "posts._id": postId },
          { $push: { "posts.$.likes": userId } }
        )
        .then(() => {
          resolve({ status: "ok", postLiked: true });
        })
        .catch((err) => {
          console.log("err");
          reject({ status: "error", postLiked: false, error: err });
        });
    });
  },

  // userPost unlike operations
  unLikeUserPost: (userId, postId, postUserId) => {
    return new Promise(async (resolve, reject) => {
      post
        .updateOne(
          { postUserId, "posts._id": postId },
          { $pull: { "posts.$.likes": userId } }
        )
        .then(() => {
          resolve({ status: "ok", postUnLiked: true });
        })
        .catch((err) => {
          reject({ status: "error", postUnLiked: false, error: err });
        });
    });
  },

  //post comment add operation
  commentUserPost: (userIdParam, postId, postUserId, comment) => {
    return new Promise(async (resolve, reject) => {
      const userDetails = await user.aggregate([
        { $match: { _id: ObjectId(userIdParam) } },
        { $project: { email: 0, password: 0, mobile: 0 } },
      ]);
      const commentObj = {
        userDetails,
        comment,
        date: new Date(),
      };

      post
        .updateOne(
          { userId: postUserId, "posts._id": postId },
          { $push: { "posts.$.comments": commentObj } }
        )
        .then(async () => {
          const comments = await post.findOne(
            { userId: postUserId, "posts._id": postId },
            { posts: { $elemMatch: { _id: postId } } }
          );
          resolve(comments.posts[0].comments);
        })
        .catch((err) => {
          reject({ status: "error", commenAdded: false, error: err });
        });
    });
  },

  // fetching all post comments
  getPostComments: (postUserId, postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comments = await post.findOne(
          { userId: postUserId, "posts._id": postId },
          { posts: { $elemMatch: { _id: postId } } }
        );
        resolve(comments.posts[0].comments);
      } catch (err) {
        reject({ status: "error", fetchAllComments: false, error: err });
      }
    });
  },
};
