import Axios from "../axios/axios";
import { fetchAllUsersUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const fetchAllUsers = async (editBody) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(fetchAllUsersUrl, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
