import { Container } from "@mui/material";
import React from "react";
import './LeftHeader.css'

function LeftHeader() {
  return (
    <div className="left-header">
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className="custom-main"
      >
        <p
          style={{
            fontSize: "1.02rem",
            marginTop: ".9rem",
            marginBottom: "8px",
          }}
        >
          <div className="flex text-[1.3rem] ml-4">Chats</div>
        </p>
      </Container>
    </div>
  );
}

export default LeftHeader;
