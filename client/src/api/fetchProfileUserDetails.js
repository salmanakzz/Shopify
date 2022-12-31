import Axios from "../axios/axios";
import { fetchProfileUserUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const fetchProfileUser = async (profileUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      fetchProfileUserUrl + `?profileUserId=${profileUserId}`,
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

export const fetchProfileUserDetails = fetchProfileUser;
