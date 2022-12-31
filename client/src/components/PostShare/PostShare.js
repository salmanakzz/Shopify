import React, { useContext, useEffect, useRef, useState } from "react";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import CameraIcon from "@mui/icons-material/Camera";
import ClearIcon from "@mui/icons-material/Clear";
import "./PostShare.css";
import { Box, Container } from "@mui/material";
import Axios from "../../axios/axios";
import { submitPost } from "../../urls/urls";
import { ContextUser } from "../../store/MainContext";
import { ContextAllPosts } from "../../store/AllPostContext";
import Swal from "sweetalert2";
import { getUserData } from "../../api/getUserData";

const PostShare = ({ handleClose }) => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null)

  const imageRef = useRef();

  const { currentUser,profileUser } = useContext(ContextUser);
  const { setPostDatas, setProfilePostDatas } = useContext(ContextAllPosts);

  
  useEffect(() => {
    getUserData(currentUser._id).then(({userData})=>{
     setUser(userData)
    })
     
   }, [profileUser])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      setImage({
        image: URL.createObjectURL(img),
      });

      setImageFile(event.target.files[0]);
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="post-share">
      <Box className="ps-box">
        <div className="post-share-body">
          <img src={user?.profilePictureUrl ? user.profilePictureUrl : DefaultProfile} alt="" />
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
                <div class="flex justify-center items-center w-[5rem] h-[2rem] hover:bg-[#1976d221] rounded-lg cursor-pointer">
                  <CameraIcon style={{ fill: "#fba441" }} />
                  Story
                </div>
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
