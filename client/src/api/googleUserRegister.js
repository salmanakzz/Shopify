
import Axios from "../axios/axios";
import { googleUserRegister } from "../urls/urls";

export const googleUserSignIn = async (userData) => {
  try {
    const { data } = await Axios.post(googleUserRegister,userData);
    return data;
  } catch (err) {
    console.log(err);
  }
};
