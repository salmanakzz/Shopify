import React, { useContext, useEffect, useState } from "react";
import { fetchFriends } from "../../api/fetchFriends";
import { ContextUser } from "../../store/MainContext";
import FriendsSide from "../FriendsSide/FriendsSide";
import PostSide from "../PostSide/PostSide";
import RequestSide from "../RequestSide/RequestSide";
import "./HomeBody.css";

function HomeBody() {
  const { currentUser } = useContext(ContextUser);
  const [friends, setFriends] = useState(null);
  useEffect(() => {
    fetchFriends(currentUser._id).then(({ friendsArr }) => {
      setFriends(friendsArr);
    });
  }, []);

  return (
    <div className="home-body">
      <RequestSide friends={friends} setFriends={setFriends} />
      <PostSide />
      <FriendsSide friends={friends} />
    </div>
  );
}

export default HomeBody;
