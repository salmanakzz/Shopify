import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./ChartCard.css";
import { Requestswww } from "../../api/Requestswww";
import Online from "@mui/icons-material/FiberManualRecord";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

function ChatCard({ page ,setChatUser}) {
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

  return (
    <div className="chat-card">
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
          {page === "profile" ? "Friends" : "Chats"}
        </p>
        <hr />
        <Box
          sx={{
            padding: "12px",
          }}
        >
          {Requestswww.map((requester, idx) => (
            <div className="chater" key={idx}>
              <div>
                <img src={requester.img} alt="" className="chater-img" />
                <div className="chater-name">
                  <span onClick={()=>setChatUser(requester)}>{requester.name}</span>
                </div>
              </div>
              <Online className="online-btn" />
              <MapsUgcIcon className="co-btn" />
            </div>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default ChatCard;
