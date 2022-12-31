import Axios from "../axios/axios";
import { friendRequestUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const addRequest = async (profileUserId, currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      friendRequestUrl,
      {
        profileUserId,
        currentUserId,
      },
      {
        headers: {
          "x-accesss-token": token,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const FriendRequest = addRequest;
