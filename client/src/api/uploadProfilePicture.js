import Axios from "../axios/axios";
import { uploadProfilePictureUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

export const uploadProfilePicture = async (formData) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.patch(
        uploadProfilePictureUrl,
        formData,
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
;