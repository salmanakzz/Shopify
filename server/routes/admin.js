// admin routers

const express = require("express");
const { adminVerified, adminLogin, fetchUsers } = require("../controllers/adminController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

// checking user token route
router.get("/api/isAdminAuth", verifyJWT, adminVerified);

// admin login route
router.post("/api/login", adminLogin);

// fetch users route
router.get("/api/fetch-users",verifyJWT, fetchUsers);

module.exports = router;
