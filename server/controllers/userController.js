// user routes controlling

const jwt = require("jsonwebtoken");
const authHelper = require("../helpers/user/authHelper");
const postHelper = require("../helpers/user/postHelper");
const userHelper = require("../helpers/user/userHelper");

// user verified route
const userVerified = (req, res) =>
  res.json({ status: "ok", user: true, auth: true });

// request access token route controlling\
const requestAccessToken = (req, res) => {
  try {
    const token = req.headers["x-refresh-token"];

    if (!token) {
      res.json({ user: false, admin: false, auth: false, err: "no token" });
    } else {
      jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET,
        async (err, decoded) => {
          if (err) {
            console.log("refresh====", err);
            res.json({
              status: "error",
              error: err,
              auth: false,
            });
          } else {
            console.log("decode====", decoded._id);
            req.userData = decoded._id;
            const response = await authHelper.generateTokens(decoded._id);
            if (response) {
              res.json(response);
            }
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// user signup route controlling
const userSignup = (req, res) => {
  authHelper
    .doRegister(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      err.keyPattern?.email
        ? res.json({ status: "error", error: "Duplicate email", err })
        : err.keyPattern?.mobile
        ? res.json({ status: "error", error: "Duplicate mobile", err })
        : res.json({ status: "error", error: err });
    });
};

// user login route controlling
const userLogin = (req, res) => {
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

// user submit post route controlling
const submitPost = (req, res) => {
  postHelper
    .submitUserPost(req.body, req.file)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch postDatas route controlling
const fetchPostDatas = (req, res) => {
  postHelper
    .fetchAllPosts()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

//userPost delete route controlling
const deletePost = (req, res) => {
  const { userId, postId } = req.query;
  postHelper
    .deleteUserPost(userId, postId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

//userPost edit route controlling
const editPost = (req, res) => {
  const { userId, postId, newDesc } = req.body;
  postHelper
    .editUserPost(userId, postId, newDesc)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

//userPost like route controlling
const likePost = (req, res) => {
  const { userId, postId, postUserId } = req.body;
  postHelper
    .likeUserPost(userId, postId, postUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

//userPost unlike route controlling
const unLikePost = (req, res) => {
  const { userId, postId, postUserId } = req.body;
  postHelper
    .unLikeUserPost(userId, postId, postUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(response);
      console.log(err);
    });
};

//userPost comment route controlling
const submitComment = (req, res) => {
  const { userId, postId, postUserId, comment } = req.body;
  postHelper
    .commentUserPost(userId, postId, postUserId, comment)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch comments route controlling
const fetchCommentDatas = (req, res) => {
  const { postUserId, postId } = req.body;
  postHelper
    .getPostComments(postUserId, postId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// verify number route controlling
const verifyNumber = (req, res) => {
  const { mobile } = req.body;
  authHelper
    .verifyUserNumber(mobile)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// verify otp route controlling
const verifyOtp = (req, res) => {
  const { requestId, otp, userDetails } = req.body;
  authHelper
    .verifyUserOtp(requestId, otp, userDetails)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// user follow route controling
const addFollow = (req, res) => {
  const { profileUserId, currentUserId } = req.body;
  userHelper
    .addFollowUser(profileUserId, currentUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// user unfollow route controling
const unFollow = (req, res) => {
  const { profileUserId, currentUserId } = req.body;
  userHelper
    .unFollowUser(profileUserId, currentUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// fetch profile user controlling
const fetchProfileUser = (req, res) => {
  const { profileUserId } = req.query;
  userHelper
    .fetchProfileUserDetails(profileUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// friend request route controlling
const friendRequest = (req, res) => {
  const { profileUserId, currentUserId } = req.body;
  userHelper
    .userFriendRequest(profileUserId, currentUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// friend request remove route controlling
const removeFriendRequest = (req, res) => {
  const { profileUserId, currentUserId } = req.body;
  userHelper
    .removeUserFriendRequest(profileUserId, currentUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// fetch requests route controllig
const fetchRequests = (req, res) => {
  const { currentUserId } = req.query;
  userHelper
    .fetchUserRequests(currentUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// add friend route controlling
const addFriend = (req, res) => {
  const { currentUserId, requesterId } = req.body;
  userHelper
    .addFriendUser(currentUserId, requesterId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

//fetching suggestions route controlling
const fetchSuggestions = (req, res) => {
  const { currentUserId } = req.query;
  userHelper
    .fetchUserSuggestions(currentUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// user reporting route controlling
const submitReport = (req, res) => {
  const {currentUserId, profileUserId } = req.body;
  userHelper
    .submitUserReport(currentUserId,profileUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// user remove report route controlling
const removeReport = (req, res) => {
  const {currentUserId, profileUserId } = req.body;
  userHelper
    .removeUserReport(currentUserId,profileUserId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch user data route controlling
const userData = (req, res) => {
  const { userId } = req.params;
  userHelper
    .fetchUserDetails(userId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch user's friends route controlling
const fetchFriends = (req, res) => {
  const { userId } = req.params;
  userHelper
    .fetchFriendsDetails(userId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch all users route controlling
const fetchUsers = (req, res) => {
  userHelper
    .fetchUsersDetails()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// upload user profilePicture route controlling
const uploadProfilePicture = (req, res) => {
  userHelper
    .uploadUserProfilePicture(req.body,req.file)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch all posts route controlling
const fetchAllPosts = (req, res) => {
  postHelper
    .fetchAllPosts()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = {
  userVerified,
  userSignup,
  userLogin,
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
  removeReport,
  userData,
  fetchFriends,
  fetchUsers,
  uploadProfilePicture,
  fetchAllPosts
};
