// admin routers

const express = require("express");
const { adminVerified, adminLogin, fetchUsers, blockUser, unBlockUser } = require("../controllers/adminController");
const { fetchAllPosts } = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

// checking user token route
router.get("/api/isAdminAuth", verifyJWT, adminVerified);

// admin login route
router.post("/api/login", adminLogin);

// fetch users route
router.get("/api/fetch-users",verifyJWT, fetchUsers);

// block user route
router.patch("/api/block-user",verifyJWT, blockUser);

// unblock user route
router.patch("/api/unblock-user",verifyJWT, unBlockUser);

// fetch all posts route
router.get("/api/fetch-all-posts", verifyJWT,fetchAllPosts);

module.exports = router;
