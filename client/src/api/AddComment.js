import Axios from "../axios/axios";
import { submitCommentUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const AddingComment = async (userId, postId, postUserId, comment) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      submitCommentUrl,
      { userId, postId, postUserId, comment },
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

export const AddComment = AddingComment;
