export const enum ProcessStep {
  Loading = 'Loading',
  ConnectWallet = 'Connect Wallet',
  SwitchNetwork = 'Switch Network',
  ApproveToken = 'Approve Token',
  ApprovingToken = 'Approving',
  Mint = 'Mint',
  Executing = 'Minting',
  InsufficientFunds = 'Insufficient Funds',
}

export const ChainIdToName = {
  1: 'ethereum',
  10: 'optimism',
  42161: 'arbitrum',
  137: 'polygon',
  8453: 'base',
  7777777: 'zora'
} as const;