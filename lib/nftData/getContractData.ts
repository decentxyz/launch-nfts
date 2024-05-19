import axios from 'axios';
import { Address } from 'viem';
import { ResEndpoint } from '../../utils/types';
import { ChainId } from '@decent.xyz/box-common';

// switch to Airstack or simplehash
export const getContractData = async (addresses: Address[], chainId: ChainId) => {
  try {
    const { data: contractData } = await axios.get(
      `https://${ResEndpoint[chainId]}.reservoir.tools/collections/v7`, {
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