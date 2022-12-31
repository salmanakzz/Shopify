// user field operations

const user = require("../../config/models/userModel");
const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../../config/collections");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  // fetching user operation
  fetchUsersDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await user.find();
        resolve(users);
      } catch (error) {
        reject({ status: "error", fetchUsers: false, error });
      }
    });
  },
};
