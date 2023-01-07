import React, { useContext, useEffect, useRef, useState } from "react";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import CameraIcon from "@mui/icons-material/Camera";
import ClearIcon from "@mui/icons-material/Clear";
import "./PostShare.css";
import { Box, Container, Modal } from "@mui/material";
import Axios from "../../axios/axios";
import { submitPost } from "../../urls/urls";
import { ContextUser } from "../../store/MainContext";
import { ContextAllPosts } from "../../store/AllPostContext";
import Swal from "sweetalert2";
import { getUserData } from "../../api/getUserData";
import { useSnackbar } from "notistack";
import { addStory } from "../../api/addStory";

const PostShare = ({ handleClose ,setStoryAdd}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [story, setStory] = useState(null);
  const [storyFile, setStoryFile] = useState(null);

  const imageRef = useRef();
  const storyRef = useRef();

  const { currentUser, profileUser } = useContext(ContextUser);
  const { setPostDatas, setProfilePostDatas } = useContext(ContextAllPosts);

  useEffect(() => {
    getUserData(currentUser._id).then(({ userData }) => {
      setUser(userData);
    });
  }, [profileUser]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      setImage({
        image: URL.createObjectURL(img),
      });

      setImageFile(event.target.files[0]);
    }
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
          setStoryAdd(true)
          handleClickVariant("Story addedd succesfully!", "success");
        }else{
          Swal.close();
          handleClickVariant("Something went wrong!", "error");
        }
      });
     
    }
  };

  const handleShareButton = () => {
    if (imageFile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleClose && handleClose();
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
      formData.append("desc", description);
      formData.append("image", imageFile);

      Axios.post(submitPost, formData)
        .then(({ data }) => {
          setImage(null);
          setPostDatas(data);
          setProfilePostDatas(
            data.filter((element) => element.user[0]._id === currentUser._id)
          );
          Swal.close();
          handleClickVariant("Post addedd succesfully!", "success");
          return;
        })
        .catch((err) => {
          console.log(err);
          handleClickVariant("Something went wrong!", "error");
          return;
        });
    }
    handleClickVariant("Please choose a file!", "warning");
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

  return (
    <Container component="main" maxWidth="xs" className="post-share">
      <Box className="ps-box">
        <div className="post-share-body">
          <img
            src={
              user?.profilePictureUrl ? user.profilePictureUrl : DefaultProfile
            }
            alt=""
          />
          <div>
            <input
              className="post-input"
              type="text"
              name=""
              id=""
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your thoughts!"
            />
            <div className="post-options items-center">
              <div className="option" onClick={() => imageRef.current.click()}>
                <div class="flex justify-center items-center w-[5rem] h-[2rem] hover:bg-[#1976d221] rounded-lg cursor-pointer">
                  <PhotoIcon style={{ fill: "#07b607e3" }} />
                  Photo
                </div>
              </div>
              <div className="option">
                <div class="flex justify-center items-center w-[5rem] h-[2rem] hover:bg-[#1976d221] rounded-lg cursor-pointer">
                  <VideoCameraBackIcon style={{ fill: "#ff1616de" }} />
                  Video
                </div>
              </div>
              <div className="option">
                <div
                  onClick={() => storyRef.current.click()}
                  class="flex justify-center items-center w-[5rem] h-[2rem] hover:bg-[#1976d221] rounded-lg cursor-pointer"
                >
                  <CameraIcon style={{ fill: "#fba441" }} />
                  Story
                </div>
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
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box
                      sx={{
                        ...style,
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
                                user?.profilePictureUrl
                                  ? user.profilePictureUrl
                                  : DefaultProfile
                              }
                              alt=""
                            />
                            <span>
                              {user?.firstname} {user?.lastname}
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
              </div>
              <button
                onClick={handleShareButton}
                className="custom-button ps-btn w-[4rem] h-[2.2rem]"
              >
                Share
              </button>
              <div style={{ display: "none" }}>
                <input
                  type="file"
                  name="image"
                  ref={imageRef}
                  onChange={onImageChange}
                />
              </div>
            </div>
            {image && (
              <div className="preview-img">
                <ClearIcon
                  onClick={() => {
                    setImage(null);
                    setImageFile(null);
                  }}
                />
                <img src={image.image} alt="" />
              </div>
            )}
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default PostShare;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
