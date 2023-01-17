import Axios from "../axios/axios";
import { removeFriendUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const removeFriend = async (profileUserId, currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      removeFriendUrl,
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

