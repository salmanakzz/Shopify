import React, { useContext, useEffect, useState } from "react";
import { PostDatas } from "../../api/PostDatas";
import { ContextAllPosts } from "../../store/AllPostContext";
import { ContextUser } from "../../store/MainContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Post } from "../Post/Post";
import "./Posts.css";
import PostShare from "../PostShare/PostShare";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
 
function Posts({ page }) {
  const { postDatas, setPostDatas, profilePostDatas, setProfilePostDatas } =
    useContext(ContextAllPosts);

  const { currentUser, profileUser } = useContext(ContextUser);
  const { _id } = profileUser ? profileUser : currentUser;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const data = PostDatas();

    data.then((result) => {      
      result?.length > 0 && setPostDatas(result);
      result?.length > 0 &&  setProfilePostDatas(
        result.filter((element) => element.user[0]._id === _id)
      );
    });
  }, [_id, setPostDatas, setProfilePostDatas,profileUser]);

  return (
    <>
      {postDatas ? (
        <div className="posts">
          {(page === "profile" ? profilePostDatas : postDatas).map(
            (post, idx) => (
              <Post key={idx} data={post} idx={idx} />
            )
          )}
          {page === "profile" ? (
            profileUser &&
            profileUser._id === currentUser._id && (
              <AddCircleIcon
                className="add-share-btn"
                id="add-share-btn"
                onClick={handleOpen}
                sx={page === "profile" ? { right: "12%" } : { right: "26%" }}
              />
            )
          ) : (
            <AddCircleIcon
              className="add-share-btn"
              id="add-share-btn"
              onClick={handleOpen}
              sx={page === "profile" ? { right: "12%" } : { right: "26%" }}
            />
          )}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PostShare handleClose={handleClose} />
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
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
export default Posts;
