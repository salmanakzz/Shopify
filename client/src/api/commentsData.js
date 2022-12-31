import Axios from "../axios/axios";
import { fetchCommentDatas } from "../urls/urls";
import { getToken } from "./tokenFetch";

const FetchCommentData = async (postUserId, postId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.post(
      fetchCommentDatas,
      {
        postUserId,
        postId,
      },
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

export const CommentDatas = FetchCommentData;
