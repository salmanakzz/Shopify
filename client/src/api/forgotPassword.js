import Axios from "../axios/axios";
import { forgotPasswordUrl } from "../urls/urls";

export const forgotPassword = async (email) => {
  try {
    const { data } = await Axios.post(forgotPasswordUrl,email);
    return data;
  } catch (err) {
    console.log(err);
  }
};

