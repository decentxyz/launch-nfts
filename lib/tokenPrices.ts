export async function getUsdPrice({
  tokenAddress,
  chainId
}: {
  tokenAddress: string,
  chainId: number
}){
  try {
    const response = await fetch(`/api/getTokenPrice?chainId=${chainId}&tokenAddress=${tokenAddress}`);
    const data = await response.json();

    const { usdPrice } = data.usdPrice;
    return usdPrice;
  } catch (e) {
    console.error('Error fetching token price: ', e['message']);
  }
}