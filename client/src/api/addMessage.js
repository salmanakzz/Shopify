import Axios from "../axios/axios";
import { addMessageUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const addMessage = async (message) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.post(
        addMessageUrl, message,
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
