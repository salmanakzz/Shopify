// user auth operations

const user = require("../../config/models/userModel");
const googleUser = require("../../config/models/googleUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_USER_ACCESS,
    secretAccessKey: process.env.BUCKET_USER_SECRET,
  },
  region: process.env.BUCKET_REGION,
});

const nodemailer = require('nodemailer');

module.exports = {
  // user insert mongoose operation
  doRegister: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.blocked = false;
      await user
        .create(userData)
        .then(() => {
          resolve({ status: "ok" });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // googleUser insert mongoose operation
  googleUserRegister: ({ email, firstname, lastname }) => {
    return new Promise(async (resolve, reject) => {
      let userData = await user.findOne({ email });
      if (!userData) {
        const newUser = new googleUser({
          firstname,
          lastname,
          email,
          blocked: false,
        });
        userData = await newUser.save();
      }
      if (userData) {
        const {
          _id,
          firstname,
          lastname,
          followers,
          following,
          friends,
          friendRequest,
          profilePicture,
        } = userData;

        const data = {
          time: Date(),
          _id,
          firstname,
          lastname,
          followers,
          following,
          friends,
          friendRequest,
          profilePicture,
        };

        if (profilePicture) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 60 });
          data.profilePictureUrl = url;
        }

        if (userData.blocked) {
          reject({ status: "error", error: "userBlocked" });
        } else {
          const token = jwt.sign({ data }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m",
          });
          const refreshToken = jwt.sign(
            { _id },
            process.env.JWT_REFRESH_SECRET,
            {
              expiresIn: "1y",
            }
          );
          resolve({
            status: "ok",
            user: true,
            token: token,
            refreshToken,
            result: userData,
          });
        }
      }
    });
  },

  // user find mongoose operation
  doLogin: ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      const userDetails = await user.findOne({ email });

      if (userDetails) {
        const {
          _id,
          firstname,
          lastname,
          followers,
          following,
          friends,
          friendRequest,
          profilePicture,
        } = userDetails;

        const data = {
          time: Date(),
          _id,
          firstname,
          lastname,
          followers,
          following,
          friends,
          friendRequest,
          profilePicture,
        };

        if (profilePicture) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 60 });
          data.profilePictureUrl = url;
        }
        if (userDetails.password) {
          bcrypt.compare(password, userDetails.password).then((status) => {
            if (status) {
              if (userDetails.blocked) {
                reject({ status: "error", error: "userBlocked" });
              } else {
                const token = jwt.sign(
                  { data },
                  process.env.JWT_ACCESS_SECRET,
                  {
                    expiresIn: "30m",
                  }
                );
                const refreshToken = jwt.sign(
                  { _id },
                  process.env.JWT_REFRESH_SECRET,
                  {
                    expiresIn: "1y",
                  }
                );
                resolve({
                  status: "ok",
                  user: true,
                  token: token,
                  refreshToken,
                  result: userDetails,
                });
              }
            } else {
              reject({
                status: "error",
                error: "invalid username or password",
              });
            }
          });
        } else {
          reject({
            status: "error",
            error: "invalid username or password",
          });
        }
      } else {
        reject({ status: "error", error: "user not found" });
      }
    });
  },
  forgotPasswordSet: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await user.findOne({ email });
        if (userDetails) {
          const secret = process.env.JWT_RESET_PASS_SECRET;
          const token = jwt.sign(
            { email: userDetails.email, id: userDetails._id },
            secret,
            {
              expiresIn: "5m",
            }
          );

          const link = `http://localhost:3000/reset-password/${userDetails._id}/${token}`;

          var transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
              user: process.env.FORGOT_SEND_EMAIL,
              pass: process.env.FORGOT_SEND_PASS
            }
          });
          
          var mailOptions = {
            from: `"Shopify"<${process.env.FORGOT_SEND_EMAIL}>`,
            to: email,
            subject: 'Shopify account password Reset',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          console.log(link);

          resolve({
            status: "ok",
            emailRegistered: true,
            userDetails,
          });
        } else {
          reject({ status: "error", emailRegistered: false });
        }
      } catch (err) {
        reject({ error: err });
      }
    });
  },
  resetUserPassword: (id, token) => {
    return new Promise(async (resolve, reject) => {
      const userDetails = await user.findOne({ _id: id });
      if (!userDetails) {
        return reject({ status: "error", emailRegistered: false });
      }
      const secret = process.env.JWT_RESET_PASS_SECRET;
      try {
        const verify = jwt.verify(token, secret);
        resolve({ status: "ok", verified: true });
      } catch (error) {
        reject({ status: "error", verified: false, error });
      }
    });
  },
  confirmResetUserPassword: (id, token, newPassword) => {
    return new Promise(async (resolve, reject) => {
      const userDetails = await user.findOne({ _id: id });
      if (!userDetails) {
        return reject({ status: "error", emailRegistered: false });
      }
      const secret = process.env.JWT_RESET_PASS_SECRET;
      try {
        const verify = jwt.verify(token, secret);
        const encryptPassword = await bcrypt.hash(newPassword, 10);
        await user.updateOne(
          { _id: id },
          { $set: { password: encryptPassword } }
        );
        resolve({
          status: "ok",
          passwordUpdated: true,
        });
      } catch (error) {
        resolve({
          status: "error",
          passwordUpdated: false,
          error,
        });
      }
    });
  },
  verifyUserNumber: (mobile) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await user.findOne({ mobile });
        if (userDetails) {
          resolve({
            status: "ok",
            numberRegistered: true,
            userDetails,
          });
        } else {
          reject({ status: "error", numberRegistered: false });
        }
      } catch (err) {
        reject({ error: err });
      }
    });
  },
  verifyUserOtp: (userDetails) => {
    return new Promise(async (resolve, reject) => {
      console.log(userDetails);
      const {
        _id,
        firstname,
        lastname,
        followers,
        following,
        friends,
        friendRequest,
        profilePicture,
      } = userDetails;
      const data = {
        time: Date(),
        _id,
        firstname,
        lastname,
        followers,
        following,
        friends,
        friendRequest,
        profilePicture,
      };

      if (profilePicture) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: profilePicture,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });
        data.profilePictureUrl = url;
      }

      if (userDetails.blocked) {
        reject({ status: "error", error: "userBlocked" });
      } else {
        const token = jwt.sign({ data }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "30m",
        });
        const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, {
          expiresIn: "1y",
        });
        resolve({
          status: "ok",
          otpVerified: true,
          token: token,
          refreshToken,
          result: userDetails,
        });
      }
      resolve({
        status: "error",
        otpVerified: false,
      });
    });
  },
  generateTokens: (currentUserId) => {
    return new Promise(async (resolve, reject) => {
      const userDetails = await user.findOne({ _id: currentUserId });

      if (userDetails) {
        const {
          _id,
          firstname,
          lastname,
          followers,
          following,
          friends,
          friendRequest,
        } = userDetails;
        const data = {
          time: Date(),
          _id,
          firstname,
          lastname,
          followers,
          following,
          friends,
          friendRequest,
        };
        const token = jwt.sign({ data }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "30m",
        });
        const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, {
          expiresIn: "1y",
        });
        resolve({
          status: "ok",
          user: true,
          token: token,
          refreshToken,
          result: userDetails,
        });
      } else {
        reject({ status: "error", error: "no user" });
      }
    });
  },
};
