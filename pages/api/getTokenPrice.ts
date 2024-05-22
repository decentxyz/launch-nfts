import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chainId, tokenAddress } = req.query;
  
  try {
    const response = await fetch(
      `https://api.decentscan.xyz/getTokenPrice?chainId=${chainId}&tokenAddress=${tokenAddress}`,
      {
        headers: {
          'x-api-key': `${process.env.NEXT_PUBLIC_DECENT_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const data = await response.json();
    res.status(200).json({
      usdPrice: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch price.' });
  }
}