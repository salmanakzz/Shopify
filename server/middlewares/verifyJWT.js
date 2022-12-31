// verify token middleware

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

  try {
    const token = req.headers["x-accesss-token"];

    if (!token) {
      res.json({ user: false, admin: false, auth: false, err: "no token" });
    } else {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            status: "error",
            error: err,
            auth: false,
          });
        } else {
          req.userData = decoded.data;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyJWT;
