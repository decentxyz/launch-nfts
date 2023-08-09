import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { fetchNftData } from '../../../lib/nftData/fetchNftData';

const cache: { [key: string]: any } = {};
let isDataFetched = false;

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const addresses = req.query.addresses as string;
  const contractArray = addresses?.split(',');

  if (!isDataFetched) {
    try {
      const collections = await fetchNftData(contractArray);
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