import Axios from "../axios/axios";
import { addStoryUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const addStory = async (formdata) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.post(addStoryUrl, formdata, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
