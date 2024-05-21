import { createConfig } from 'wagmi';
import { http, Chain } from 'viem';
import {
  mainnet,
  optimism,
  arbitrum,
  base,
  zora,
  polygon,
  zkSync,
} from 'wagmi/chains';

export const chains = [
  mainnet,
  optimism,
  arbitrum,
  polygon,
  base,
  zora,
  zkSync,
] as unknown as readonly [Chain, ...Chain[]];

export const transports = chains.reduce((a: any, c: Chain) => {
  a[c.id] = http();
  return a;
}, {});

export const wagmiConfig = createConfig({ chains, transports });
