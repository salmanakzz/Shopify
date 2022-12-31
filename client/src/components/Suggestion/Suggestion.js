import React, { useContext, useState } from "react";
import "./Suggestion.css";
import ClearIcon from "@mui/icons-material/Clear";
import { ContextUser } from "../../store/MainContext";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import { useNavigate } from "react-router-dom";
import { AddFollow } from "../../api/AddFollow";
import { unFollow } from "../../api/UnFollow";

function Suggestion({ suggestion, suggestions, setSuggestions, idx }) {
  const navigate = useNavigate();

  const { currentUser, setProfileUser } = useContext(ContextUser);

  const [follow, setFollow] = useState(false);

  const handleFollow = (suggestUserId, currentUserId) => {
    AddFollow(suggestUserId, currentUserId).then((result) => {
      console.log(result);
      const { status, followed } = result;
      if (status === "ok" && followed) {
        setFollow(true);
      }
    });
  };

  const handleUnFollow = (suggestUserId, currentUserId) => {
    unFollow(suggestUserId, currentUserId).then((result) => {
      console.log(result);
      const { status, unFollowed } = result;
      if (status === "ok" && unFollowed) {
        setFollow(false);
      }
    });
  };

  const navigateProfile = (requestUser) => {
    setProfileUser(requestUser);
    navigate("/profile");
  };

  const handleRemoveSuggestion = (suggestionId) => {
    setSuggestions(suggestions.filter((obj) => obj._id !== suggestionId));
  };

  const card = document.querySelector("#suggest-custom-main");
  const request = document.querySelector(".request-card");
  if (card) {
    window.onscroll = function () {
      myFunction2();
    };
    function myFunction2() {
      if (window.pageYOffset > card.offsetTop - 80) {
        card.style.position = "fixed";
        card.style.top = "3.5rem";
        request.style.display = "none";
      } else if (window.pageYOffset < card.offsetTop) {
        request.style.display = "block";

        card.style.position = "relative";
        card.style.top = ".2rem";
      }
    }
  }

  return (
    <>
      <div className="requester" key={idx}>
        <div className="left">
          <img
            onClick={() => navigateProfile(suggestion)}
            src={suggestion?.profilePictureUrl ? suggestion.profilePictureUrl : DefaultProfile}
            alt=""
            className="requester-img"
          />
          <div className="requester-name">
            <span onClick={() => navigateProfile(suggestion)}>
              {suggestion.firstname + " " + suggestion.lastname}
            </span>
            <span style={{ fontSize: "12px" }}>
              {suggestion.followers.length} followers
            </span>
          </div>
        </div>
        <div className="right">
          {!follow ? (
            <button
              className="custom-button sf-btn"
              fdprocessedid="ail4th"
              onClick={() => handleFollow(suggestion._id, currentUser._id)}
            >
              follow
            </button>
          ) : (
            <button
              className="custom-button sf-btn"
              fdprocessedid="ail4th"
              onClick={() => handleUnFollow(suggestion._id, currentUser._id)}
            >
              unfollow
            </button>
          )}
          <ClearIcon
            onClick={() => handleRemoveSuggestion(suggestion._id)}
            className="suggest-close"
          />
        </div>
      </div>
    </>
  );
}

export default Suggestion;
