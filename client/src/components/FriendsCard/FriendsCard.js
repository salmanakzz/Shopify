import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./FriendsCard.css";
import DefaultProfile from '../../assets/images/DefaultProfile.png'
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { fetchFriends } from "../../api/fetchFriends";
import { ContextUser } from "../../store/MainContext";

function FriendsCard({ page ,setFriendUser}) {
  const { currentUser } = useContext(ContextUser);
  const [friends, setFriends] = useState(null)
  useEffect(() => {
    if (page === "profile") {
      window.onscroll = function () {
        myFunction();
      };

      var header = document.getElementById("chat-card-id");
      function myFunction() {
        if (window.pageYOffset > 460) {
          header.classList.add("scroll-fix");
        } else {
          header.classList.remove("scroll-fix");
        }
      }
    }
  }, []);

  useEffect(() => {
   fetchFriends(currentUser._id).then(({friendsArr})=>{
    setFriends(friendsArr);
   })
  }, [])
  

  return (
    <div className="friends-card">
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className={page === "profile" ? "profile-custom-main" : "custom-main"}
      >
        <p
          style={{
            fontSize: "1.02rem",
            marginLeft: "20px",
            marginTop: "1rem",
            marginBottom: "8px",
          }}
        >
          Friends
        </p>
        <hr />
        <Box
          sx={{
            padding: "12px",
          }}
        >
          {friends?.length > 0 ? friends.map((friend, idx) => (
            <div className="friend" key={idx}>
              <div>
                <img src={friend.profilePictureUrl ? friend.profilePictureUrl : DefaultProfile} alt="" className="friend-img" />
                <div className="friend-name">
                  <span onClick={()=>setFriendUser(friend)}>{friend.firstname} {friend.lastname}</span>
                </div>
              </div>
              <MapsUgcIcon className="co-btn" />
            </div>
          )):<span><div class="flex justify-center align-center"><span>No Friends</span></div></span>}
        </Box>
      </Container>
    </div>
  );
}

export default FriendsCard;
