import React, { useContext, useState } from "react";
import { ContextUser } from "../../store/MainContext";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import StoryView from "../StoryView/StoryView";
import "./PostSide.css";

const PostSide = ({ page }) => {
  const { currentUser, profileUser } = useContext(ContextUser);
  const [storyAdd, setStoryAdd] = useState(false);
  return (
    <div
      className="post-side"
      style={{ marginTop: page === "profile" ? "-1rem" : "4rem" }}
    >
      {page !== "profile" ? <StoryView storyAdd={storyAdd} setStoryAdd={setStoryAdd} /> : ""}
      {page === "profile" ? (
        profileUser && profileUser._id === currentUser._id && <PostShare />
      ) : (
        <PostShare setStoryAdd={setStoryAdd} />
      )}
      <Posts page={page} />
    </div>
  );
};

export default PostSide;
