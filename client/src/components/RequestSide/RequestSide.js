import React from "react";
import RequestCard from "../RequestCard/RequestCard";
import SuggestedCard from "../SuggetsedCard/SuggestedCard";
import "./RequestSide.css";

function RequestSide() {
  return (
    <div className="request-side" style={{ marginTop: "4rem" }}>
      <RequestCard />
      <SuggestedCard/>
    </div>
  );
}

export default RequestSide;
