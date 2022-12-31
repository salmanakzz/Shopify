import Axios from "../axios/axios";
import { fetchMessagesUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const fetchMessages = async (chatId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      fetchMessagesUrl+`/${chatId}`,
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
