import Axios from "../axios/axios";
import { addFriendUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const AddingFriend = async (currentUserId, requesterId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      addFriendUrl,
      {
        currentUserId,
        requesterId,
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

export const AddFriend = AddingFriend;
