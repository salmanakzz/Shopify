import Axios from "../axios/axios";
import { fetchRequestsUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";
const requestDatas = async (currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      fetchRequestsUrl + `?currentUserId=${currentUserId}`,
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

export const Requests = requestDatas;
