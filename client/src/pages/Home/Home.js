import React from "react";
import Body from "../../components/Body/Body";
import Navbar from "../../components/Navbar/Navbar";

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <Body page={"home"} />
    </div>
  );
}

export default HomePage;
