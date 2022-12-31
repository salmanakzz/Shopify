import Axios from "../axios/axios";
import { submitReportUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const submitReport = async (currentUserId,profileUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.post(
      submitReportUrl,
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
