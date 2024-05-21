import { mainnet, zora, base, polygon, optimism, arbitrum } from "viem/chains";
import { createConfig, http } from "wagmi";
import { ChainId } from "@decent.xyz/box-common";

export const ChainLookup = {
  [ChainId.ETHEREUM]: mainnet,
  [ChainId.POLYGON]: polygon,
  [ChainId.ARBITRUM]: arbitrum,
  [ChainId.OPTIMISM]: optimism,
  [ChainId.BASE]: base,
  [ChainId.ZORA]: zora,
} as const;

export const wagmiConfig = createConfig({
  chains: [mainnet],
  // https://chainlist.org/
  transports: {
    [mainnet.id]: http('https://rpc.flashbots.net'),
  },
});