import Axios from "../axios/axios";
import { resetPasswordUrl } from "../urls/urls";

export const resetPassword = async (METHOD, id, token, password) => {
  try {
    const { data } = await Axios({
      url: resetPasswordUrl + "/" + id + "/" + token,
      method: METHOD,
      data: {
        password,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
