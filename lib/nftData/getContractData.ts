import axios from 'axios';
import { Address } from 'viem';

export const getContractData = async (addresses: Address[]) => {
  try {
    const { data: contractData } = await axios.get(
      "https://api-base.reservoir.tools/collections/v6", {
        headers: {
          "x-api-key": process.env.RESERVOIR_API_KEY as string,
        },
        params: {
          contract: addresses
        }
      });

    return contractData.collections;
  } catch (e) {
    console.error("Failed to get data from Reservoir: ", e);
    throw new Error('Error getting nft data.');
  };
}