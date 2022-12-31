import Axios from "../axios/axios";
import { editPostUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const EditingPost = async (editBody) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(editPostUrl, editBody, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const EditPost = EditingPost;