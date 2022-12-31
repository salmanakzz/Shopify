// admin auth operations

const jwt = require("jsonwebtoken");

module.exports = {
  //   user find mongoose operation
  doLogin: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (email === adminEmail && password === adminPassword) {
        const data = {
          time: Date(),
          email:adminEmail,
        };
        const token = jwt.sign({ data }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "15m",
        });
        resolve({
          status: "ok",
          admin: true,
          token: token,
        });
      } else {
        reject({ status: "error", error: "invalid username or password" });
      }
    });
  },
};
