import Axios from "../axios/axios";
import { VerifyNumberUrl } from "../urls/urls";

const VerifyingNumber = async (mobile) => {
  try {
    const { data } = await Axios.post(VerifyNumberUrl,mobile);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const VerifyNumber = VerifyingNumber;
