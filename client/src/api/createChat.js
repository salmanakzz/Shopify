import Axios from "../axios/axios";
import { createChatUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const createChat = async (senderId, recieverId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.post(
        createChatUrl, {senderId, recieverId},
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
}