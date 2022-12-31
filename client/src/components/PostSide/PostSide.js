import React, { useContext } from "react";
import { ContextUser } from "../../store/MainContext";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import StoryView from "../StoryView/StoryView";
import "./PostSide.css";

const PostSide = ({ page }) => {
  const { currentUser, profileUser } = useContext(ContextUser);
  return (
    <div
      className="post-side"
      style={{ marginTop: page === "profile" ? "-1rem" : "4rem" }}
    >
      {page !== "profile" ? <StoryView /> : ""}
      {page === "profile" ? (
        profileUser && profileUser._id === currentUser._id && <PostShare />
      ) : (
        <PostShare />
      )}
      <Posts page={page} />
    </div>
  );
};

export default PostSide;
