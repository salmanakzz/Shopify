import { unblockUserUrl } from "../../urls/urls";
import Axios from "../../axios/axios";
import { getToken } from "../tokenFetch";

export const unBlockUser = async (userId) => {
  try {
    const token = getToken("adminToken");
    
    const { data } = await Axios.patch(unblockUserUrl,{userId},{
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
