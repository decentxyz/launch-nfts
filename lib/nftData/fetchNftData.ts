import axios from "axios";

export const fetchNftData = async (contractArray: string[]) => {
  try {
    const { data: contractData } = await axios.get(
      "https://api-base.reservoir.tools/collections/v6", {
        headers: {
          method: "GET",
          accept: "*/*",
          "x-api-key": process.env.RESERVOIR_API_KEY as string,
        },
        params: {
          contract: contractArray
        }
      });

    return contractData.collections;
  } catch (e) {
    console.error(e);
    throw new Error('Error getting nft data.');
  };
};