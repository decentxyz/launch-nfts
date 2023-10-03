import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { RedisClient } from '../../../lib/database/RedisClient';
 
interface ChainData {
  oneDay: Object,
  sevenDay: Object
}
interface ParsedData {
  [key: string]: any;
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: ChainData = {
    oneDay: {},
    sevenDay: {}
  };

  const targetDate = req.query.targetDate as string;

  try {
    await RedisClient.connect();
    const fetchedData = await RedisClient.hGet('noderedis:chainStats', targetDate);
    let parsedData: ParsedData = {};
    if (fetchedData) parsedData = JSON.parse(fetchedData);

    if (parsedData) {
      data.oneDay = parsedData["1day"];
      data.sevenDay = parsedData["7day"];
    }
    
    res.status(200).json(data);    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error getting data from database.' });
  } finally {
    await RedisClient.quit();
    console.log("Closed Redis.")
  }
}

export default handler;