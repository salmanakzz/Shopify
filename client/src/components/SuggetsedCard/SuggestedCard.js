import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FetchSuggestions } from "../../api/fetchSuggestions";
import { ContextUser } from "../../store/MainContext";
import Suggestion from "../Suggestion/Suggestion";
import "./SuggestedCard.css";

function SuggestedCard() {
  const { currentUser } = useContext(ContextUser);
  const [suggestions, setSuggestions] = useState(null);
  useEffect(() => {
    FetchSuggestions(currentUser._id).then((result) => {
      setSuggestions(result);
    });
  }, []);
  return (
    <div className="suggest-card">
      <Container
        component="main"
        maxWidth="xs"
        id="suggest-custom-main"
        className="suggest-custom-main"
      >
        <p
          style={{
            fontSize: "1.02rem",
            marginLeft: "20px",
            marginTop: "1rem",
            marginBottom: "8px",
          }}
        >
          Suggested
        </p>
        <hr />
        <Box
          sx={{
            padding: "12px",
          }}
        >
          {suggestions?.length > 0  ? (
            suggestions.map((suggestion, idx) => (
              <Suggestion
                key={idx}
                suggestion={suggestion}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                idx={idx}
              />
            ))
          ) : (
            <div className="flex justify-center align-center">
              <span>No Suggestions</span>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default SuggestedCard;
