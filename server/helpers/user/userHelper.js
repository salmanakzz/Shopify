// user field operations

const user = require("../../config/models/userModel");
const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../../config/collections");
const ObjectId = mongoose.Types.ObjectId;

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

module.exports = {
  //user follow operation
  addFollowUser: (profileUserId, currentUserId) => {
    return new Promise((resolve, reject) => {
      user
        .updateOne(
          { _id: profileUserId },
          { $addToSet: { followers: ObjectId(currentUserId) } }
        )
        .then(() => {
          user
            .updateOne(
              { _id: currentUserId },
              { $addToSet: { following: ObjectId(profileUserId) } }
            )
            .then(() => {
              resolve({ status: "ok", followed: true });
            });
        })
        .catch((err) => {
          resolve({ status: "error", followed: false, error: err });
        });
    });
  },

  //user unfollow operation
  unFollowUser: (profileUserId, currentUserId) => {
    return new Promise((resolve, reject) => {
      user
        .updateOne(
          { _id: profileUserId },
          { $pull: { followers: ObjectId(currentUserId) } }
        )
        .then(() => {
          user
            .updateOne(
              { _id: currentUserId },
              { $pull: { following: ObjectId(profileUserId) } }
            )
            .then(() => {
              resolve({ status: "ok", unFollowed: true });
            });
        })
        .catch((err) => {
          resolve({ status: "error", unFollowed: false, error: err });
        });
    });
  },

  // fetching prfile user details
  fetchProfileUserDetails: (profileUserId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await user.findOne({ _id: profileUserId });
        if (userDetails?.profilePicture) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: userDetails.profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 60 });
          userDetails.profilePictureUrl = url;
        }
        resolve(userDetails);
      } catch (err) {
        reject({ status: "error", error: err });
      }
    });
  },

  // add friend request opertion
  userFriendRequest: (profileUserId, currentUserId) => {
    return new Promise((resolve, reject) => {
      user
        .updateOne(
          { _id: profileUserId },
          { $addToSet: { friendRequest: ObjectId(currentUserId) } }
        )
        .then(() => {
          resolve({ status: "ok", friendRequest: true });
        })
        .catch((err) => [
          resolve({ status: "error", friendRequest: false, error: err }),
        ]);
    });
  },
  // remove friend request operation
  removeUserFriendRequest: (profileUserId, currentUserId) => {
    return new Promise((resolve, reject) => {
      user
        .updateOne(
          { _id: profileUserId },
          { $pull: { friendRequest: ObjectId(currentUserId) } }
        )
        .then(() => {
          resolve({ status: "ok", removeFriendRequest: true });
        })
        .catch((err) => [
          reject({ status: "error", removeFriendRequest: false, error: err }),
        ]);
    });
  },

  // fetch user requests operatoins
  fetchUserRequests: (currentUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        const requests = await user.aggregate([
          {
            $match: {
              _id: ObjectId(currentUser),
            },
          },
          { $unwind: "$friendRequest" },
          {
            $lookup: {
              from: USER_COLLECTION,
              localField: "friendRequest",
              foreignField: "_id",
              as: "request",
            },
          },
          {
            $project: {
              request: 1,
            },
          },
        ]);
        let requestArr = [];
        requests.forEach((element) => {
          requestArr.push(element.request[0]);
        });
        for (const request of requestArr) {
          if(request?.profilePicture){
           const getObjectParams = {
             Bucket: process.env.BUCKET_NAME,
             Key: request.profilePicture,
           };
           const command = new GetObjectCommand(getObjectParams);
           const url = await getSignedUrl(s3, command, { expiresIn: 60 });
           request.profilePictureUrl = url;
          }
         }
        resolve(requestArr);
      } catch (err) {
        reject({ status: "error", fetchRequest: false, error: err });
      }
    });
  },

  // add friend operation
  addFriendUser: (currentUserId, requesterId) => {
    return new Promise((resolve, reject) => {
      user
        .updateOne(
          { _id: currentUserId },
          { $addToSet: { friends: ObjectId(requesterId) } }
        )
        .then(() => {
          user
            .updateOne(
              { _id: requesterId },
              { $addToSet: { friends: ObjectId(currentUserId) } }
            )
            .then(() => {
              user
                .updateOne(
                  { _id: currentUserId },
                  { $pull: { friendRequest: ObjectId(requesterId) } }
                )
                .then(() => {
                  resolve({ status: "ok", friendAdded: true });
                })
                .catch((err) => {
                  reject({
                    status: "error",
                    removeFriendRequest: false,
                    error: err,
                  });
                });
            })
            .catch((err) => {
              reject({ status: "error", friendAdded: false, error: err });
            });
        })
        .catch((err) => {
          reject({ status: "error", friendAdded: false, error: err });
        });
    });
  },

  //fetch user suggestions operation
  fetchUserSuggestions: (currentUserId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await user.findOne({
          _id: ObjectId(currentUserId),
        });

        userDetails.following.push(ObjectId(currentUserId));

        const suggestions = await user.aggregate([
          { $match: { _id: { $nin: userDetails.following } } },
          { $sample: { size: 5 } },
        ]);

        for (const suggestion of suggestions) {
         if(suggestion?.profilePicture){
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: suggestion.profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 60 });
          suggestion.profilePictureUrl = url;
         }
        }
        resolve(suggestions);
      } catch (error) {
        reject({ status: "error", fetchSuggestions: false, error });
      }
    });
  },
  // user reporting operations
  submitUserReport: (currentUserId, profileUserId) => {
    return new Promise((resolve, reject) => {
      user
        .updateOne(
          { _id: profileUserId },
          { $addToSet: { reports: ObjectId(currentUserId) } }
        )
        .then(() => {
          resolve({ status: "ok", reported: true });
        })
        .catch((error) => {
          reject({ status: "error", reported: false, error });
        });
    });
  },
  // user data fetching operations
  fetchUserDetails: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await user.findOne(
          { _id: ObjectId(userId) },
          { password: 0 }
        );
        if (userData?.profilePicture) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: userData.profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 60 });
          userData.profilePictureUrl = url;
        }
        resolve({ status: "ok", fetchUserData: true, userData });
      } catch (error) {
        reject({ status: "error", fetchUserData: false, error });
      }
    });
  },
  // fetch friends operation
  fetchFriendsDetails: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const friends = await user.aggregate([
          { $match: { _id: ObjectId(userId) } },

          { $unwind: "$friends" },
          {
            $lookup: {
              from: USER_COLLECTION,
              localField: "friends",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              _id: 0,
              user: 1,
            },
          },
        ]);
        let friendsArr = [];
        friends.forEach((data) => {
          friendsArr.push(data.user[0]);
        });
        resolve({ status: "ok", fetchFriends: true, friendsArr });
      } catch (error) {
        reject({ status: "error", fetchFriends: false, error });
      }
    });
  },
  // fetching all users operations
  fetchUsersDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await user.find();
        for (const user of users) {
          if(user?.profilePicture){
           const getObjectParams = {
             Bucket: process.env.BUCKET_NAME,
             Key: user.profilePicture,
           };
           const command = new GetObjectCommand(getObjectParams);
           const url = await getSignedUrl(s3, command, { expiresIn: 60 });
           user.profilePictureUrl = url;
          }
         }
        resolve({ status: "ok", fetchAllUsers: true, users });
      } catch (error) {
        reject({ status: "error", fetchAllUsers: false, error });
      }
    });
  },
  //uplaod profile picture operations
  uploadUserProfilePicture: (body, file) => {
    return new Promise(async (resolve, reject) => {
      const { userId, profileImgId } = body;

      if (profileImgId) {
        const params2 = {
          Bucket: process.env.BUCKET_NAME,
          Key: profileImgId,
        };

        const command2 = new DeleteObjectCommand(params2);
        await s3.send(command2);
      }

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
      user
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: { profilePicture: imageName } }
        )
        .then(() => {
          resolve({ status: "ok", profileUpdated: true });
        })
        .catch((error) => {
          reject({ status: "error", profileUpdated: false, error });
        });
    });
  },
};
