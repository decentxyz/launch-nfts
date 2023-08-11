import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import axios from 'axios';

const cache: { [key: string]: any } = {};
let isDataFetched = false;
let dataFetchingPromise: Promise<void> | null = null;

const fetchNftData = async (contractArray: string[]) => {
  try {
    const { data: contractData } = await axios.get(
      "https://api-base.reservoir.tools/collections/v6", {
        headers: {
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

const fetchData = async (contractArray: string[]) => {
  try {
    const collections = await fetchNftData(contractArray);
    if (contractArray.length > 1) {
      cache['data'] = collections;
      isDataFetched = true;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    isDataFetched = false;
  }
  dataFetchingPromise = null;
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const addresses = req.query.addresses as string;
  const contractArray = addresses?.split(',');

  if (!isDataFetched && !dataFetchingPromise || contractArray.length === 1) {
    dataFetchingPromise = fetchData(contractArray || []);
  }

  if (!isDataFetched && dataFetchingPromise) {
    await dataFetchingPromise;
  }

  if (isDataFetched) {
    if (contractArray && contractArray.length > 0) {
      try {
        const collections = await fetchNftData(contractArray);
        res.status(200).json(collections);
        return;
      } catch (error) {
        console.error('Error fetching specific data:', error);
        res.status(500).json({ message: 'Internal server error.' });
        return;
      }
    }

    res.status(200).json(cache['data']);
  } else {
    res.status(503).json({ message: 'Service unavailable. Please try again later.' });
  }
};

export default handler;
