import Axios from "../axios/axios";
import { searchAndFetchMessagesUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const searchAndFetchMessages = async (chatterId, currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      searchAndFetchMessagesUrl +
        `?chatterId=${chatterId}&currentUserId=${currentUserId}`,
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
