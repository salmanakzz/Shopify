import React from "react";
import RequestCard from "../RequestCard/RequestCard";
import SuggestedCard from "../SuggetsedCard/SuggestedCard";
import "./RequestSide.css";

function RequestSide({ setFriends, friends }) {
  return (
    <div className="request-side" style={{ marginTop: "4rem" }}>
      <RequestCard friends={friends} setFriends={setFriends} />
      <SuggestedCard />
    </div>
  );
}

export default RequestSide;
