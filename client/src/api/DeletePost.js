import Axios from "../axios/axios";
import { deletePostUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const deletingPost = async (id,postId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.delete(deletePostUrl + `?userId=${id}&postId=${postId}`, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const DeletePost = deletingPost;