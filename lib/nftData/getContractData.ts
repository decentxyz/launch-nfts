import axios from 'axios';
import absoluteUrl from '../utils/absoluteUrl';

export const getContractData = async (address: string) => {
  try {
    const response = await axios.get(`${absoluteUrl().origin}/api/getSingleNftData?address=${address}`);

    return response.data;
  } catch (e) {
    console.log("Error getting single contract data.")
  }
};