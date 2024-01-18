import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import axios from 'axios';
import { ChainStats } from '../../../lib/types';
import { RedisClient } from '../../../lib/database/RedisClient';

const cron: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const datePosted = new Date();
  try {
    await RedisClient.connect();
    
    // Get the last update from Redis; want to make sure only running once a day to align w. cron
    const lastUpdateTimestamp = await RedisClient.get('noderedis:dateUpdated');

    if (!lastUpdateTimestamp || datePosted.getTime() - new Date(lastUpdateTimestamp).getTime() >= 24 * 60 * 60 * 1000) {
      const { data: chainData }: { data: ChainStats } = await axios.get(
        "https://api-base.reservoir.tools/chain/stats/v1", {
        headers: {
          method: "GET",
          accept: "*/*",
          "x-api-key": process.env.RESERVOIR_API_KEY as string,
        }
      });
      
      const statsJson = JSON.stringify(chainData.stats);

      // Update the execution timestamp in Redis
      await RedisClient.set('noderedis:dateUpdated', datePosted.toLocaleDateString());

      // Store data in Redis Hash
      await RedisClient.hSet('noderedis:chainStats', datePosted.toLocaleDateString(), statsJson);

      res.status(200).json(chainData);
    } else {
      console.log('Code already executed within the last 24 hours.');
      res.status(200).json({ message: 'Code already executed within the last 24 hours.' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await RedisClient.quit();
  }
};

export default cron;