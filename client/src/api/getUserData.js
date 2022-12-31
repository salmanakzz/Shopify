import Axios from "../axios/axios";
import { getUserDataUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const getUserData = async (userId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      getUserDataUrl+`/${userId}`,
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

