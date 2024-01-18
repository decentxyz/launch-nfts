const Blockscanners = {
  1: 'etherscan.io',
  10: 'optimistic.etherscan.io',
  42161: 'arbiscan.io',
  137: 'polyscan.com',
  8453: 'basescan.org'
} as const;

export const getBlockscanner = (chainId: number) => {
  let blockscannerUrl = Blockscanners[chainId as keyof typeof Blockscanners];
  let blockscannerName = blockscannerUrl.split('.')[0];
  let cleanName = blockscannerName.charAt(0).toUpperCase() + blockscannerName.slice(1);

  return {
    url: blockscannerUrl,
    name: cleanName
  }
}