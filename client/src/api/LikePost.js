import Axios from "../axios/axios";
import { likePostUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const LikingPost = async (userId, postId, postUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      likePostUrl,
      { userId, postId, postUserId },
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

export const LikePost = LikingPost;
