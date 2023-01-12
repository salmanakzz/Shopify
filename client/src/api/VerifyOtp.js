import Axios from "../axios/axios";
import { VerifyOtpUrl } from "../urls/urls";

const VerifyingOTP = async (userDetails) => {
  try {
    const { data } = await Axios.post(VerifyOtpUrl, { userDetails });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const VerifyOTP = VerifyingOTP;
