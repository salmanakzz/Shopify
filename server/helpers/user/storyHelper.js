// user story operations
const storySchema = require("../../config/models/storyModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { USER_COLLECTION } = require("../../config/collections");

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
  addingStory: (userId, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (file) {
          const type = file.mimetype.includes("image")
            ? "image"
            : file.mimetype.includes("video")
            ? "video"
            : "";
          const randomImageName = (bytes = 32) =>
            crypto.randomBytes(bytes).toString("hex");

          const storyName = randomImageName();
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: storyName,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const command = new PutObjectCommand(params);
          await s3.send(command).catch((err) => {
            console.log(err);
          });

          const storyExits = await storySchema.findOne({
            userId: ObjectId(userId),
          });
          if (storyExits) {
            const story = {
              url: storyName,
              type: type,
            };

            await storySchema.updateOne(
              { userId: ObjectId(userId) },
              { $push: { stories: story } }
            );
            resolve({ status: "ok", storyAdded: true });
          } else {
            const story = {
              url: storyName,
              type: type,
            };

            const userStory = new storySchema({
              userId,
              stories: [story],
              date: new Date(),
            });
            await userStory.save();
            resolve({ status: "ok", storyAdded: true });
          }
        }
      } catch (error) {
        reject({ status: "error", storyadded: false });
      }
    });
  },
  getAllStories: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const storiescoll = await storySchema.aggregate([
          {
            $addFields: {
              stories: {
                $map: {
                  input: "$stories",
                  as: "story",
                  in: {
                    $cond: [
                      {
                        $lte: ["$$story.createdAt", new Date()],
                      },
                      {
                        $mergeObjects: [
                          "$$story",
                          {
                            hours: {
                              $floor: {
                                $divide: [
                                  {
                                    $subtract: [
                                      new Date(),
                                      "$$story.createdAt",
                                    ],
                                  },
                                  36e5,
                                ],
                              },
                            },
                          },
                        ],
                      },
                      "$$story",
                    ],
                  },
                },
              },
            },
          },
          {$sort:{date:-1}},
          {
            $project: {
              stories: {
                $filter: {
                  input: "$stories",
                  as: "story",
                  cond: { $lte: ["$$story.hours", 24] },
                },
              },
              userId: 1,
              _id: 0,
            },
          },
          {
            $lookup: {
              from: USER_COLLECTION,
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          
        ]);

        for (const storyDoc of storiescoll) {
          for (const story of storyDoc.stories) {
            if (story?.url) {
              const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: story.url,
              };
              const command = new GetObjectCommand(getObjectParams);
              const url = await getSignedUrl(s3, command, { expiresIn: 60 });
              story.url = url;
            }
          }

          if (storyDoc.user[0]?.profilePicture) {
            const getObjectParams2 = {
              Bucket: process.env.BUCKET_NAME,
              Key: storyDoc.user[0].profilePicture,
            };
            const command2 = new GetObjectCommand(getObjectParams2);
            const url2 = await getSignedUrl(s3, command2, { expiresIn: 60 });
            storyDoc.user[0].profilePictureUrl = url2;
          }
        }
        resolve({ status: "ok", getStories: true, stories: storiescoll });
      } catch (error) {
        reject({ status: "error", getStories: false, error });
      }
    });
  },
};
