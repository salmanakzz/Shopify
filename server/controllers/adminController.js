// admin routes controlling

const authHelper = require("../helpers/admin/authHelper");
const userHelper = require("../helpers/admin/userHelper");

// admin verified route
const adminVerified = (req, res) =>
  res.json({ status: "ok", admin: true, auth: true });

// admin login route controlling
const adminLogin = (req, res) => {
  authHelper
    .doLogin(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// fetch users route controlling
const fetchUsers = async (req, res) => {
  try {
    const users = await userHelper.fetchUsersDetails();
    res.json(users)
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  adminVerified,
  adminLogin,
  fetchUsers,
};
