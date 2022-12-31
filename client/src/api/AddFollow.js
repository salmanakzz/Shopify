import Axios from "../axios/axios";
import { addFollowUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const AddingFollow = async (profileUserId, currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      addFollowUrl,
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

export const AddFollow = AddingFollow;
