import Axios from "../axios/axios";
import { removeReportUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const removeReport = async (currentUserId,profileUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
      removeReportUrl,
      {
        currentUserId,
        profileUserId,
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
