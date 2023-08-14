import axios from 'axios';
import { Address } from 'viem';

const cache = new Map();

export const getContractData = async (addresses: Address[]) => {
  if (cache.has(addresses)) {
    return cache.get(addresses);
  }

  try {
    const response = await axios.get("https://api-base.reservoir.tools/collections/v6", {
      headers: {
        "x-api-key": process.env.RESERVOIR_API_KEY,
      },
      params: {
        contract: addresses,
      },
    });

    const contractData = response.data.collections;
    cache.set(addresses, contractData);
    return contractData;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting NFT data.');
  }
};