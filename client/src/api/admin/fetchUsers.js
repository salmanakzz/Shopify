import { fetchUsersUrl } from "../../urls/urls";
import Axios from "../../axios/axios";
import { getToken } from "../tokenFetch";

export const fetchUsers = async () => {
    console.log('hit f');
  try {
    const token = getToken("adminToken");
    const { data } = await Axios.get(fetchUsersUrl,{
      headers: {
        "x-accesss-token": token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
