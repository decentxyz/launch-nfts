import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import axios from 'axios';

const cache: { [key: string]: any } = {};
let isDataFetched = false;

const fetchData = async (contractArray: string[]) => {
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

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const addresses = req.query.addresses as string;
  const contractArray = addresses?.split(',');

  if (!isDataFetched) {
    try {
      const collections = await fetchData(contractArray);
      cache['data'] = collections;
      isDataFetched = true;
    } catch (error) {
      res.status(404).json({ message: 'Error getting nft data.' });
      return;
    };
  };

  if (cache['data']) {
    res.status(200).json(cache['data']);
  } else {
    res.status(404).json({ message: 'Data not available.' });
  };
};

export default handler;