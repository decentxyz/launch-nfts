import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { wagmiSetup } from '@decent.xyz/box-common';
import { mainnet, zora, optimism, base, arbitrum } from "wagmi/chains";
import { Chain } from 'viem';

const { transports } = wagmiSetup;

export const wagmiConfig = getDefaultConfig({
  appName: 'Launch Decent',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
  chains: [mainnet, zora, optimism, base, arbitrum] as unknown as readonly [Chain, ...Chain[]],
  transports,
  ssr: true,
});