import axios from 'axios';
import absoluteUrl from '../utils/absoluteUrl';

export const getContractData = async (addresses: string[]) => {
  try {
    const response = await axios.get(`${absoluteUrl().origin}/api/getNftData?addresses=${addresses}`);

    return response.data;
  } catch (e) {
    console.log("Error getting all contract data.")
  }
}