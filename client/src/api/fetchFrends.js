import Axios from "../axios/axios";
import {fetchFriendsUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const fetchFriends = async (currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(fetchFriendsUrl+`/${currentUserId}`, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
