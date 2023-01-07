import Axios from "../axios/axios";
import { getStoriesUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const getStories = async () => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(getStoriesUrl, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

