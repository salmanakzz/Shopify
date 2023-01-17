import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextUser } from "../../store/MainContext";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import "./ProfileHeadSection.css";
import { AddFollow } from "../../api/AddFollow";
import { unFollow } from "../../api/UnFollow";
import { fetchProfileUserDetails } from "../../api/fetchProfileUserDetails";
import {
  Alert,
  Avatar,
  Box,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FriendRequest } from "../../api/FriendRequest";
import { RemoveFriendRequest } from "../../api/RemoveFriendRequest";
import { submitReport } from "../../api/submitReport";
import { removeReport } from "../../api/removeReport";
import CropEasy from "../crop/CropEasy";
import { Crop, CurrencyBitcoin } from "@mui/icons-material";
import { uploadProfilePicture } from "../../api/uploadProfilePicture";
import { ContextAllPosts } from "../../store/AllPostContext";
import { useSnackbar } from "notistack";
import { addStory } from "../../api/addStory";
import Swal from "sweetalert2";
import { getStories } from "../../api/getStories";
import Stories from "react-insta-stories";
import { format } from "timeago.js";
import { removeFriend } from "../../api/removeFriend";

function ProfileHeadSection() {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser, profileUser, setProfileUser } = useContext(ContextUser);
  const { profilePostDatas } = useContext(ContextAllPosts);
  const { _id } = profileUser?._id ? profileUser : currentUser;

  const [profileUserDetails, setProfileUserDetails] = useState(
    profileUser?._id ? profileUser : currentUser
  );

  useEffect(() => {
    setProfileUserDetails(profileUser?._id ? profileUser : currentUser);
    setProfilePicture2(
      profileUser?.profilePictureUrl ? profileUser.profilePictureUrl : null
    );
  }, [profileUser]);

  console.log(currentUser, "fddddddddsgsdf", profileUser);
  const [profilePicture2, setProfilePicture2] = useState(
    profileUserDetails?.profilePictureUrl
      ? profileUserDetails.profilePictureUrl
      : null
  );

  const settings = profileUser
    ? profileUser._id === currentUser._id
      ? ["Edit profile photo", "Edit cover photo"]
      : ["Friend request?", "Report"]
    : ["Edit profile photo", "Edit cover photo"];

  const [friendRequested, setFriendRequested] = useState(
    profileUserDetails?.friendRequest?.includes(currentUser._id) ? true : false
  );
  const [friends, setFriends] = useState(
    profileUserDetails?.friends?.includes(currentUser._id) ? true : false
  );
  const [followed, setFollowed] = useState(
    profileUserDetails?.followers?.includes(currentUser._id) ? true : false
  );

  useEffect(() => {
    fetchProfileUserDetails(_id).then((result) => {
      setProfileUserDetails(result);
      setProfileUser(result);
      result?.profilePictureUrl && setProfilePicture2(result.profilePictureUrl);
      result?.profilePictureUrl && setPhotoURL(result.profilePictureUrl);
    });
  }, [profilePicture2]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFollow = (profileUserId, currentUserId) => {
    AddFollow(profileUserId, currentUserId).then((result) => {
      const { status, followed } = result;
      if (status === "ok" && followed) {
        profileUserDetails.followers.length =
          profileUserDetails?.followers.length + 1;
        setFollowed(true);
      }
    });
  };
  const handleUnFollow = (profileUserId, currentUserId) => {
    unFollow(profileUserId, currentUserId).then((result) => {
      const { status, unFollowed } = result;
      if (status === "ok" && unFollowed) {
        profileUserDetails.followers.length =
          profileUserDetails?.followers.length - 1;
        setFollowed(false);
      }
    });
  };
  const handleFriendRequest = (profileUserId, currentUserId) => {
    FriendRequest(profileUserId, currentUserId).then((result) => {
      handleCloseUserMenu();
      setFriendRequested(true);
      console.log(result);
    });
  };

  const handleRemoveFriendRequest = (profileUserId, currentUserId) => {
    RemoveFriendRequest(profileUserId, currentUserId).then((result) => {
      handleCloseUserMenu();
      setFriendRequested(false);
      console.log(result);
    });
  };

  const handleRemoveFriend = (profileUserId, currentUserId) => {
    removeFriend(profileUserId, currentUserId).then((result) => {
      handleCloseUserMenu();
      setFriends(false);
      console.log(result);
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    handleCloseUserMenu();
  };
  const handleClose = () => setOpen(false);
  const [noReport, setNoReport] = useState(false);

  const reports = [
    "It's spam",
    "It's inappropiate",
    "It's pretending to be someone else",
    "Abusive content",
    "Other",
  ];
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "#fff",
    border: "none",
    borderRadius: ".5rem",
    boxShadow: 24,
  };

  const handleSubmitReport = (currentUserId, profileUserId) => {
    const radioButtons = document.querySelectorAll('input[name="report"]');
    let report;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        report = radioButton.value;
        break;
      }
    }
    if (!report) {
      setNoReport(true);
      return;
    }
    handleClose();
    submitReport(currentUserId, profileUserId).then((response) => {
      console.log(response);
      setReported(true);
      handleClickVariant("Report Added!", "success");
    });
  };

  const [openCrop, setOpenCrop] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    profileUserDetails?.profilePictureUrl
      ? profileUserDetails.profilePictureUrl
      : null
  );

  const [Reported, setReported] = useState(
    profileUserDetails?.reports?.find((id) =>
      id === currentUser._id ? true : false
    )
  );
  const removeReportFun = (currentUserId, profileUserId) => {
    removeReport(currentUserId, profileUserId).then((result) => {
      console.log(result);
      setReported(false);
      handleClickVariant("Report Removed!", "success");
    });
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleSubmitProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (file) {
      let formData = new FormData();
      profileUserDetails?.profilePicture &&
        formData.append("profileImgId", profileUserDetails.profilePicture);
      formData.append("userId", currentUser._id);
      formData.append("image", file);

      uploadProfilePicture(formData).then((response) => {
        console.log(response);
        const { status, profileUpdated } = response;
        if (status === "ok" && profileUpdated) {
          setProfilePicture2(photoURL);
          setLoading(false);
          setOpenEditProfile(false);
          handleClickVariant("Profile picture edited succesfully!", "success");
          return;
        }
        handleClickVariant("Something went wrong!", "error");
      });
    }
  };

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const [story, setStory] = useState(null);
  const [storyFile, setStoryFile] = useState(null);
  const [storyAdd, setStoryAdd] = useState(false);
  const [currentUserStory, setCurrentUserStory] = useState(null);
  const storyRef = useRef();

  if (currentUserStory && currentUserStory[0]?.user) {
    const { firstname, lastname, profilePictureUrl } =
      currentUserStory[0]?.user[0];
    const Heading = {
      heading: firstname + " " + lastname,

      profileImage: profilePictureUrl ? profilePictureUrl : DefaultProfile,
    };
    for (const storyObj of currentUserStory[0].stories) {
      storyObj.header = Heading;
      storyObj.header.subheading = format(storyObj.createdAt);
    }
  }

  const onAllStoriesEndHandler = () => {
    console.log("stories ended");
  };

  const storyContent = {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  };

  const onStoryChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let story = event.target.files[0];
      if (story.type.includes("image") || story.type.includes("video")) {
        setStory({
          story: URL.createObjectURL(story),
        });
      } else {
        handleClickVariant("The choosen file type support!", "error");
      }

      setStoryFile(event.target.files[0]);
    }
  };

  const handleShareStory = () => {
    if (storyFile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStory(null);
      Swal.fire({
        title: "Uploading...",
        html: "It will take a few seconds!",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let formData = new FormData();

      formData.append("userId", currentUser._id);
      formData.append("story", storyFile);

      addStory(formData).then((response) => {
        console.log(response);
        const { status, storyAdded } = response;
        if (status === "ok" && storyAdded) {
          setStory(null);
          Swal.close();
          setStoryAdd(true);
          handleClickVariant("Story addedd succesfully!", "success");
        } else {
          Swal.close();
          handleClickVariant("Something went wrong!", "error");
        }
      });
    }
  };
  const [openStory, setOpenStory] = React.useState(false);
  const handleOpenStory = () => {
    setOpenStory(true);
  };
  const handleCloseStory = () => {
    setOpenStory(false);
  };

  useEffect(() => {
    handleCloseStory();
    getStories().then(({ stories }) => {
      setCurrentUserStory(
        stories && stories.filter((story) => story.userId === currentUser._id)
      );
    });
  }, [storyAdd]);

  return (
    <div className="profile-head" style={{ marginTop: "1.7rem" }}>
      {openEditProfile && (
        <DialogContent
          dividers
          className="w-[315px] h-[200px] !border-0 bg-white fixed top-[50%] left-[50%] rounded-lg mt-1 z-10 translate-x-[-50%] translate-y-[-50%] shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span>Update Profile Picture</span>
            <ClearIcon
              className="cursor-pointer"
              onClick={() => {
                setOpenEditProfile(false);
              }}
            />
          </div>
          <hr />

          <Box sx={{ display: "flex", alignItems: "center", mt: "2rem" }}>
            <label htmlFor="profilePhoto">
              <input
                accept="image/*"
                id="profilePhoto"
                type="file"
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <Avatar
                src={photoURL ? photoURL : DefaultProfile}
                sx={{ width: 75, height: 75, cursor: "pointer" }}
              />
            </label>
            {file && (
              <IconButton
                aria-label="Crop"
                color="primary"
                onClick={() => setOpenCrop(true)}
              >
                <Crop />
              </IconButton>
            )}
          </Box>
          <div className="flex justify-end">
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress className="!w-[25px] !h-[25px] !text-[#0066ed]" />
              </Box>
            ) : (
              <button
                onClick={handleSubmitProfile}
                class="custom-button ps-btn"
                fdprocessedid="tocpe"
              >
                Save
              </button>
            )}
          </div>
        </DialogContent>
      )}

      {openCrop && (
        <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="p-4 pt-[1.5rem]">
          <span className="text-[1.1rem]">
            What's your reason for reporting this account?
          </span>
          {reports.map((report, index) => (
            <MenuItem key={index} onClick="" className="!px-0">
              <input
                type="radio"
                className="cursor-pointer"
                id={index}
                name="report"
                value={report}
              />
              <Typography className="pl-1" textAlign="center">
                {report}
              </Typography>
            </MenuItem>
          ))}
          <div className="flex justify-end">
            <button
              class="custom-button ps-btn !py-[.5rem]"
              fdprocessedid="pnn6i3"
              onClick={() =>
                handleSubmitReport(currentUser._id, profileUser._id)
              }
            >
              Confirm
            </button>
          </div>
          {noReport && (
            <Alert sx={{ mt: 1 }} severity="error">
              Please seletct a option!
            </Alert>
          )}
        </Box>
      </Modal>
      {profileUser && (
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative pb-16 bg-blueGray-200">
            <div className="container custom-container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="mt-1">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center hover:pt-1 profile-img-style">
                      <div className="relative ">
                        <div>
                          <img
                            alt="..."
                            src={
                              profilePicture2 ? profilePicture2 : DefaultProfile
                            }
                            onClick={
                              currentUserStory &&
                              currentUserStory[0]?.stories?.length > 0
                                ? handleOpenStory
                                : () => storyRef.current.click()
                            }
                            id={
                              currentUserStory &&
                              currentUserStory[0]?.stories?.length > 0 &&
                              "profile-story-circle"
                            }
                            className="cursor-pointer bg-white shadow-xl rounded-full h-auto align-middle  absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                        <div class="mr-[5px] hover:bg-[#1976d221] rounded-lg cursor-pointer relative mt-[4rem] left-[42px]">
                          {_id === currentUser._id && (
                            <EditIcon
                              onClick={() => setOpenEditProfile(true)}
                              className=" !fill-[#0066ed]"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-end items-center gap-8">
                        {profileUser && currentUser._id !== profileUser._id ? (
                          followed ? (
                            <button
                              className="profile-follow-btn text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() =>
                                handleUnFollow(profileUser._id, currentUser._id)
                              }
                            >
                              Unfollow
                            </button>
                          ) : (
                            <button
                              className="profile-follow-btn text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() =>
                                handleFollow(profileUser._id, currentUser._id)
                              }
                            >
                              Follow
                            </button>
                          )
                        ) : (
                          <>
                            <Tooltip
                              title={"Add Story"}
                              className="profile-story-tooltip"
                            >
                              <AddCircleIcon
                                className="profile-add-story-btn"
                                onClick={() => storyRef.current.click()}
                              />
                            </Tooltip>

                            {currentUserStory &&
                              currentUserStory[0]?.stories && (
                                <Modal
                                  className="w-[auto]"
                                  open={openStory}
                                  onClose={handleCloseStory}
                                  aria-labelledby="parent-modal-title"
                                  aria-describedby="parent-modal-description"
                                >
                                  <Box
                                    sx={{
                                      ...style2,
                                      width: "auto",
                                      padding: "0",
                                      borderRadius: ".5rem",
                                    }}
                                  >
                                    <Stories
                                      stories={
                                        currentUserStory &&
                                        currentUserStory[0].stories
                                      }
                                      defaultInterval={1500}
                                      // width={'100%'}
                                      // height={'100vh'}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        background: "red",
                                        cursor: "pointer",
                                      }}
                                      storyStyles={storyContent}
                                      loop={false}
                                      keyboardNavigation={true}
                                      isPaused={() => {}}
                                      currentIndex={() => {}}
                                      onStoryStart={() => {}}
                                      onStoryEnd={() => {}}
                                      onAllStoriesEnd={onAllStoriesEndHandler}
                                    />
                                  </Box>
                                </Modal>
                              )}
                            <div style={{ display: "none" }}>
                              <input
                                type="file"
                                name="story"
                                ref={storyRef}
                                onChange={onStoryChange}
                              />
                            </div>
                            {story && (
                              <Modal
                                className="w-[auto]"
                                open={true}
                                onClose={handleCloseStory}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                              >
                                <Box
                                  sx={{
                                    ...style2,
                                    width: "300px",
                                    padding: "0",
                                    borderRadius: ".5rem",
                                    border: "0",
                                  }}
                                >
                                  <div className="p-[1rem]">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-[8px]">
                                        <img
                                          className="w-[3rem] h-[3rem] rounded-full"
                                          src={
                                            profilePicture2
                                              ? profilePicture2
                                              : DefaultProfile
                                          }
                                          alt=""
                                        />
                                        <span>
                                          {profileUserDetails?.firstname +
                                            " " +
                                            profileUserDetails?.lastname}
                                        </span>
                                      </div>
                                      <div class="mr-[5px] hover:bg-[#1976d221] rounded-lg cursor-pointer">
                                        <ClearIcon
                                          className="cursor-pointer"
                                          onClick={() => {
                                            setStory(null);
                                            setStoryFile(null);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="preview-img">
                                      {storyFile?.type.includes("image") ? (
                                        <img
                                          src={story.story}
                                          alt=""
                                          className="!max-h-[30rem]"
                                        />
                                      ) : storyFile?.type.includes("video") ? (
                                        <video
                                          autoPlay
                                          src={story.story}
                                          controls
                                          width="100%"
                                          className="!max-h-[30rem] rounded-[.5rem]"
                                        ></video>
                                      ) : (
                                        handleClickVariant(
                                          "The choosen file type support!",
                                          "error"
                                        )
                                      )}
                                    </div>
                                    <div className="flex items-center justify-end mt-2">
                                      <button
                                        onClick={handleShareStory}
                                        class="custom-button ps-btn w-[6rem] h-[2.2rem]"
                                      >
                                        Add Story
                                      </button>
                                    </div>
                                  </div>
                                </Box>
                              </Modal>
                            )}
                          </>
                        )}
                        <Box sx={{ flexGrow: 0 }}>
                          <Tooltip title="Options">
                            <IconButton
                              onClick={handleOpenUserMenu}
                              sx={{ p: 0 }}
                            >
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
                                  setting === "Friend request?"
                                    ? friendRequested
                                      ? handleRemoveFriendRequest(
                                          _id,
                                          currentUser._id
                                        )
                                      : friends
                                      ? handleRemoveFriend(_id, currentUser._id)
                                      : handleFriendRequest(
                                          _id,
                                          currentUser._id
                                        )
                                    : setting === "Report"
                                    ? Reported
                                      ? removeReportFun(
                                          currentUser._id,
                                          profileUser._id
                                        )
                                      : handleOpen()
                                    : handleCloseUserMenu()
                                }
                              >
                                <Typography textAlign="center">
                                  {setting === "Friend request?"
                                    ? followed
                                      ? friendRequested
                                        ? "Remove friend request"
                                        : friends
                                        ? "Remove friend"
                                        : setting
                                      : ""
                                    : setting === "Report"
                                    ? Reported
                                      ? "Remove Report"
                                      : "Report"
                                    : setting}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {profileUserDetails?.friends?.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Friends
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {profilePostDatas?.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Posts
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {profileUserDetails?.following?.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Following
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3
                      style={{ fontSize: "1.7rem" }}
                      className=" text-4xl font-semibold leading-normal text-blueGray-700"
                    >
                      {profileUserDetails?.firstname +
                        " " +
                        profileUserDetails?.lastname}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-5 text-blueGray-400 font-bold text-[#0066ed]">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {profileUserDetails?.followers?.length} Followers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default ProfileHeadSection;

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
