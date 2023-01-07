import { blockUserUrl } from "../../urls/urls";
import Axios from "../../axios/axios";
import { getToken } from "../tokenFetch";

export const blockUser = async (userId) => {
  try {
    const token = getToken("adminToken");
    const { data } = await Axios.patch(blockUserUrl,{userId}, {
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
