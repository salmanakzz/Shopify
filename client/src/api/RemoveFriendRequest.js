import Axios from "../axios/axios";
import { removeFriendRequestUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const removeRequest = async (profileUserId, currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      removeFriendRequestUrl,
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

export const RemoveFriendRequest = removeRequest;
