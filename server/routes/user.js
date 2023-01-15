// user routers

const express = require("express");
const {
  userSignup,
  userLogin,
  userVerified,
  submitPost,
  fetchPostDatas,
  deletePost,
  editPost,
  likePost,
  unLikePost,
  submitComment,
  fetchCommentDatas,
  verifyNumber,
  verifyOtp,
  addFollow,
  unFollow,
  fetchProfileUser,
  friendRequest,
  removeFriendRequest,
  fetchRequests,
  addFriend,
  fetchSuggestions,
  requestAccessToken,
  submitReport,
  userData,
  fetchFriends,
  fetchUsers,
  uploadProfilePicture,
  removeReport,
  fetchAllPosts,
  googleUserReg,
  verifyEmail,
  forgotPassword,
  resetPassword,
  confirmResetPassword,
} = require("../controllers/userController");
const upload = require("../middlewares/imageUpload");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

// checking user token route
router.get("/api/isUserAuth", verifyJWT, userVerified);

// checking user token route
router.get("/api/requset-access-token", requestAccessToken);

// user login route
router.post("/api/login", userLogin);

// user signup route
router.post("/api/signup", userSignup);

// google user signup route
router.post("/api/google-user-register", googleUserReg);

// user submit post route
router.post("/api/submit-post", upload.single("image"), submitPost);

// fetching postDatas route
router.get("/api/fecth-posts", verifyJWT, fetchPostDatas);

// userPost delete route
router.delete("/api/delete-post", verifyJWT, deletePost);

// userPost edit route
router.patch("/api/edit-post", verifyJWT, editPost);

// userPost like route
router.patch("/api/like-post", verifyJWT, likePost);

// userPost unlike route
router.patch("/api/unlike-post", verifyJWT, unLikePost);

// userPost comment route
router.patch("/api/submit-comment", verifyJWT, submitComment);

// userPost comments fetch route
router.post("/api/fetch-comments", verifyJWT, fetchCommentDatas);

// user verify mobile route
router.post("/api/verify-number", verifyNumber);

// user verify email route
router.post("/api/forgot-password", forgotPassword);

// user reset password route
router.get("/api/reset-password/:id/:token", resetPassword);

// user confirm reset password route
router.post("/api/reset-password/:id/:token", confirmResetPassword);

// user verify otp route
router.post("/api/verify-otp", verifyOtp);

// user follow route
router.patch("/api/add-follow", verifyJWT, addFollow);

// user unfollow route
router.patch("/api/un-follow", verifyJWT, unFollow);

// fetch profile user route
router.get("/api/fetch-profileuser", verifyJWT, fetchProfileUser);

// friend request route
router.patch("/api/friend-request", verifyJWT, friendRequest);

// friend request remove route
router.patch("/api/remove-friend-request", verifyJWT, removeFriendRequest);

// fetch requests route
router.get("/api/fetch-requests", verifyJWT, fetchRequests);

// user friend route
router.patch("/api/add-friend", verifyJWT, addFriend);

// user suggestions route
router.get("/api/fetch-Suggestions", verifyJWT, fetchSuggestions);

// user reporting route
router.post("/api/submit-report", verifyJWT, submitReport);

// user remove report route
router.patch("/api/remove-report", verifyJWT, removeReport);

// fetching user data route
router.get("/api/userdata/:userId", verifyJWT, userData);

// fetching user's friends route
router.get("/api/fetch-friends/:userId", verifyJWT, fetchFriends);

// fetching all users route
router.get("/api/fetch-users", verifyJWT, fetchUsers);

// upload user profile picture route
router.patch("/api/upload-profile-picture", verifyJWT, upload.single("image"),uploadProfilePicture);





module.exports = router;
