import Axios from "../axios/axios";
import { fetchChatsUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const userChats = async (currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      fetchChatsUrl+`/${currentUserId}`,
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


