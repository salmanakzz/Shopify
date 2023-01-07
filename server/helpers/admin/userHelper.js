// user field operations

const user = require("../../config/models/userModel");
const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../../config/collections");
const ObjectId = mongoose.Types.ObjectId;
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_USER_ACCESS,
    secretAccessKey: process.env.BUCKET_USER_SECRET,
  },
  region: process.env.BUCKET_REGION,
});

module.exports = {
  // fetching user operation
  fetchUsersDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await user.find();
        for (const user of users) {
          if (user?.profilePicture) {
            const getObjectParams = {
              Bucket: process.env.BUCKET_NAME,
              Key: user.profilePicture,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 60 });
            user.profilePictureUrl = url;
          }
        }
        resolve(users);
      } catch (error) {
        reject({ status: "error", fetchUsers: false, error });
      }
    });
  },
  // blocking user operations
  blockingUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await user.updateOne(
          { _id: ObjectId(userId) },
          { $set: { blocked: true } }
        );
        resolve({ status: "ok", userBlocked: true });
      } catch (error) {
        reject({ status: "error", userBlocked: false });
      }
    });
  },
  // unblocking user operations
  unBlockingUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await user.updateOne(
          { _id: ObjectId(userId) },
          { $set: { blocked: false } }
        );
        resolve({ status: "ok", userUnBlocked: true });
      } catch (error) {
        reject({ status: "error", userUnBlocked: false });
      }
    });
  },
};
