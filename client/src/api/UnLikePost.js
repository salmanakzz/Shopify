import Axios from "../axios/axios";
import { unLikePostUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const UnLikingPost = async (userId, postId, postUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      unLikePostUrl,
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

export const UnLikePost = UnLikingPost;
