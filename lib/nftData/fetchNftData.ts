import axios from "axios";
import absoluteUrl from "../utils/absoluteUrl";

export const fetchNftData = async (addresses: string[]) => {
  const url = `${absoluteUrl().origin}/api/getNftData?addresses=${addresses}`;
  const response = await axios.get(url);
  return response.data;
};