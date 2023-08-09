import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { fetchNftData } from '../../../lib/nftData/fetchNftData';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.query.address as string;

  try {
    const response = await fetchNftData([address]);
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ message: 'Error getting nft data.' });
    return;
  };
};

export default handler;