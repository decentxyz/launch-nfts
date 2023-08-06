import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import axios from 'axios';
 
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: chainData } = await axios.get(
      "https://api-base.reservoir.tools/chain/stats/v1", {
      headers: {
        method: "GET",
        accept: "*/*",
        "x-api-key": process.env.RESERVOIR_API_KEY as string,
      }
    });
    res.status(200).json(chainData);
  } catch (e) {
    console.log(e);
    res.status(404).end();
  };
};

export default handler;