import Axios from "../axios/axios";
import { fetchPostDatas } from "../urls/urls";
import { getToken } from "./tokenFetch";

const FetchPostData = async () => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(fetchPostDatas, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const PostDatas = FetchPostData;
