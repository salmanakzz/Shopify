import Axios from "../axios/axios";
import { VerifyOtpUrl } from "../urls/urls";

const VerifyingOTP = async (requestId, otp, userDetails) => {
  try {
    const { data } = await Axios.post(VerifyOtpUrl, { requestId, otp ,userDetails });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const VerifyOTP = VerifyingOTP;
