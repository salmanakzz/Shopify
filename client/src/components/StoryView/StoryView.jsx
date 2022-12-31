import { Box, Container } from "@mui/material";
import React from "react";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import "./StoryView.css";

function StoryView() {
  const stories = [
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
    DefaultProfile,
  ];
  return (
    <div className="story-view">
      <Container component="main" maxWidth="xs" className="story-share">
        <Box className="ps-box">
          <div className="story-share-body">
            {stories.map((story, idx) => (
              <div key={idx} className="story">
                <img src={story} alt="" />
              </div>
            ))}
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default StoryView;
