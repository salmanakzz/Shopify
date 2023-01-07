import { fetchAllPostsUrl, fetchUsersUrl } from "../../urls/urls";
import Axios from "../../axios/axios";
import { getToken } from "../tokenFetch";

export const fetchAllPosts = async () => {
  try {
    const token = getToken("adminToken");
    const { data } = await Axios.get(fetchAllPostsUrl,{
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
