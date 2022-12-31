import Axios from "../axios/axios";
import { unFollowUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const removingFollow = async (profileUserId, currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      unFollowUrl,
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

export const unFollow = removingFollow;
