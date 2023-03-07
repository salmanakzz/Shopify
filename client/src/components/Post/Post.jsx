import React, { useContext, useEffect, useRef, useState } from "react";
import NotLiked from "@mui/icons-material/ThumbUpOffAlt";
import Liked from "@mui/icons-material/ThumbUpAlt";
import Comment from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import Share from "@mui/icons-material/Share";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Axios from "../../axios/axios";
import "./Post.css";
import { Box } from "@mui/system";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { ContextUser } from "../../store/MainContext";
import { ContextAllPosts } from "../../store/AllPostContext";
import Swal from "sweetalert2";
import { CommentDatas } from "../../api/commentsData";
import { useNavigate } from "react-router-dom";
import { DeletePost } from "../../api/DeletePost";
import { EditPost } from "../../api/EditPost";
import { LikePost } from "../../api/LikePost";
import { UnLikePost } from "../../api/UnLikePost";
import { AddComment } from "../../api/AddComment";
import { format } from "timeago.js";

export const Post = ({ data, idx }) => {
  const { currentUser, setProfileUser } = useContext(ContextUser);
  const { firstname, lastname, following, followers } = data.user[0];
  const postUserId = data.user[0]._id;
  let { _id, likes, desc, comments } = data.posts;
  const settings =
    postUserId === currentUser._id ? ["Edit", "Delete", "Share"] : ["Share"];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [editDesc, setEditDesc] = useState(desc);
  const [editPostId, setEditPostId] = useState(null);
  const [edited, setEdited] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState(comments);

  const navigate = useNavigate();

  const { postDatas, setPostDatas, profilePostDatas, setProfilePostDatas } =
    useContext(ContextAllPosts);
  const id = currentUser._id;

  useEffect(() => {
    setLikeCount(likes.length);
    if (likes.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    CommentDatas(postUserId, _id).then((result) => {
      setPostComments(result);
    });
  }, [_id, id, likes, postUserId]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleEditProcess = (postId) => {
    handleCloseUserMenu();
    setEditPostId(postId);
  };

  const swalDelete = (postId) => {
    handleCloseUserMenu();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0059d0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(postId);
      }
    });
  };

  const SwallFire = (operation) => {
    Swal.fire({
      title: operation,
      html: "It will take a few seconds!",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const handleEdit = () => {
    const editBody = {
      userId: id,
      postId: editPostId,
      newDesc: editDesc,
    };
    EditPost(editBody).then((result) => {
      console.log(result);
      setEdited(true);
      setEditPostId(null);
    });
  };
  const handleDelete = (postId) => {
    SwallFire("Deleting...");
    DeletePost(id, postId).then((result) => {
      console.log(result);
      setPostDatas(postDatas.filter((data) => data.posts._id !== postId));
      setProfilePostDatas(
        profilePostDatas.filter((data) => data.posts._id !== postId)
      );
      Swal.close();
    });
  };

  const handleLike = (userId, postId, postUserId) => {
    setLiked(true);
    setLikeCount(likeCount + 1);
    LikePost(userId, postId, postUserId).then((result) => {
      if (result.status === "ok") {
      }
    });
  };

  const handleUnLike = (userId, postId, postUserId) => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    UnLikePost(userId, postId, postUserId).then((result) => {
      if (result.status === "ok") {
      }
    });
  };

  const hangleCommentSubmit = (userId, postId, postUserId, comment) => {
    AddComment(userId, postId, postUserId, comment).then((result) => {
      var inputCom = document.getElementById("input-comment");
      inputCom.value = "";
      setPostComments(result);
    });
  };

  const navigateProfile = (postUser) => {
    setProfileUser(postUser);
    navigate("/profile");
  };
  const profilePopupRef = useRef();
  const textarea = document.querySelector("#edit-desc-input");
  textarea &&
    textarea.addEventListener("keyup", (e) => {
      let height = e.target.scrollHeight;
      textarea.style.height = "auto";
      textarea.style.height = `${height}px`;
    });

  return (
    <div
      className="post"
      onMouseLeave={() => {
        profilePopupRef.current.style.display = "none";
      }}
    >
      <div className="post-header">
        <div
          ref={profilePopupRef}
          onMouseLeave={() => {
            profilePopupRef.current.style.display = "none";
          }}
          onMouseOver={() => {
            profilePopupRef.current.style.display = "block";
          }}
          id={"popup-profile" + idx}
          className="hidden shadow-lg mt-[2rem] absolute inline-block w-64 text-sm  bg-white rounded-lg "
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <img
                className="cursor-pointer w-10 h-10 rounded-full"
                src={
                  data.user[0]?.profilePictureUrl
                    ? data.user[0].profilePictureUrl
                    : DefaultProfile
                }
                onClick={() => navigateProfile(data.user[0])}
                alt="Jese Leos"
              />

              <div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  message
                </button>
              </div>
            </div>
            <p className=" text-base font-semibold leading-none ">
              <span
                onClick={() => navigateProfile(data.user[0])}
                className="cursor-pointer"
              >
                {firstname + " " + lastname}
              </span>
            </p>
            <p className="mb-3 text-sm font-normal lowercase">
              @{firstname + lastname}
            </p>
            <p className="mb-4 text-sm font-light">
              Open-source contributor Building.
            </p>
            <ul className="flex text-sm font-light">
              <li className="mr-2">
                <span className="text-blue-600 font-semibold ">
                  {following.length}
                </span>
                <span> Following</span>
              </li>
              <li>
                <span className="text-blue-600 font-semibold">
                  {followers.length}
                </span>
                <span> Followers</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="head">
          <div className="left">
            <img
              className="hover:cursor-pointer"
              src={
                data.user[0]?.profilePictureUrl
                  ? data.user[0].profilePictureUrl
                  : DefaultProfile
              }
              alt=""
              onClick={() => navigateProfile(data.user[0])}
              onMouseOver={() => {
                setTimeout(() => {
                  profilePopupRef.current.style.display = "block";
                }, [500]);
              }}
              onMouseLeave={() => {
                profilePopupRef.current.style.display = "none";
              }}
            />
            <span>
              <b
                onClick={() => navigateProfile(data.user[0])}
                className="hover:cursor-pointer"
                onMouseOver={() => {
                  setTimeout(() => {
                    profilePopupRef.current.style.display = "block";
                  }, [500]);
                }}
                onMouseLeave={() => {
                  profilePopupRef.current.style.display = "none";
                }}
              >
                {firstname + " " + lastname}
              </b>
            </span>
          </div>

          <div className="right">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreVertIcon className="home-options-svg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "2rem" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() =>
                      setting === "Delete"
                        ? swalDelete(_id)
                        : setting === "Edit"
                        ? handleEditProcess(_id)
                        : handleCloseUserMenu()
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </div>
      </div>
      <div className="description pt-3">
        {editPostId ? (
          <div className="edit-desc-area">
            <textarea
              type="text"
              className="edit-desc-input focus:!shadow-[none]"
              id="edit-desc-input"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              ref={(inputElement) => {
                if (inputElement) {
                  setTimeout(() => {
                    inputElement.focus();
                    inputElement.setSelectionRange(
                      inputElement.value.length,
                      inputElement.value.length
                    );
                  }, [0]);
                }
              }}
            />
            <button className="custom-button ps-btn" onClick={handleEdit}>
              Save
            </button>
          </div>
        ) : (
          <span id={idx}>{edited ? editDesc : desc}</span>
        )}
      </div>
      <img className="mt-3" src={data.imageUrl} alt="" />

      <div className="post-react">
        {liked ? (
          <Liked
            sx={{ fill: "#0066ed" }}
            className="cursor-pointer"
            onClick={() => handleUnLike(id, _id, postUserId)}
          />
        ) : (
          <NotLiked
            className="cursor-pointer"
            onClick={() => handleLike(id, _id, postUserId)}
          />
        )}
        <Comment
          className="cursor-pointer"
          onClick={() => setCommentBox(!commentBox)}
        />
        <Share />
      </div>
      <span>{likeCount} Likes</span>
      {commentBox && (
        <div className="comment-box-head">
          <hr className="mt-2 mb-2" />
          <div className="write-comment flex p-2 relative z[1]">
            <img src={DefaultProfile} alt="" className="w-9 h-9" />
            <div className="write-c-div flex bg-[#e2e6ed] rounded-full ml-1 w-full items-center">
              <input
                type="text"
                className="bg-[#e2e6ed] rounded-full ml-1 w-full text-[.87rem] custom-comment p-2 outline-0 border-0"
                id="input-comment"
                placeholder="Write a comment..."
                onChange={(e) => setComment(e.target.value)}
              />
              <SendIcon
                className="hover:fill-[#005bd1] cursor-pointer m-2"
                sx={{ fill: "#0066ed" }}
                onClick={() =>
                  hangleCommentSubmit(id, _id, postUserId, comment)
                }
              />
            </div>
          </div>
          <div className="comment-box max-h-96 overflow-y-auto">
            {postComments.map((comment, idx) => (
              <div key={idx} className="inner-box flex p-2">
                <img src={DefaultProfile} alt="" className="w-8 h-8" />
                <div className="bg-[#e2e6ed] p-2 rounded-lg ml-1">
                  <h6 className="text-[.9rem] leading-tight">
                    {comment.userDetails[0].firstname +
                      " " +
                      comment.userDetails[0].lastname}
                  </h6>
                  <span className="text-[.87rem] custom-comment leading-tight">
                    {comment.comment}
                  </span>
                </div>
                <span className="text-[0.6rem] text-[gray] ml-1">{format(comment.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
