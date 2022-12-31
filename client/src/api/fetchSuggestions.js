import Axios from "../axios/axios";
import { fetchSuggestionsUrl } from "../urls/urls";
import { getToken } from "./tokenFetch";

const fetchingSuggestions = async (currentUserId) => {
  try {
    const token = getToken("token");
    const { data } = await Axios.get(
      fetchSuggestionsUrl + `?currentUserId=${currentUserId}`,
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

export const FetchSuggestions = fetchingSuggestions;
