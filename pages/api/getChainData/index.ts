import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { RedisClient } from '../../../lib/database/RedisClient';

interface ChainData {
  allDates: Object,
  targetDateStats: Object
}
 
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: ChainData = {
    allDates: {},
    targetDateStats: {}
  };
  const targetDate = req.query.targetDate;
  try {
    await RedisClient.connect();
    let fetchedData = await RedisClient.json.get('noderedis:chainStats', {
      path: [
        '$.Date',
        '$.Stats'
      ]
    });

    const parsedData = JSON.parse(JSON.stringify(fetchedData));
    data.allDates = parsedData;
    const dateIndex = parsedData['$.Date'].indexOf(targetDate);

    if (targetDate && dateIndex !== -1) {
      data.targetDateStats = JSON.parse(parsedData['$.Stats'][dateIndex]);
    };

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error getting data from database.' });
  } finally {
    await RedisClient.quit();
  }
}

export default handler;