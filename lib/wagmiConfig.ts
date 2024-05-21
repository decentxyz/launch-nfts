import { mainnet, zora, base, polygon, optimism, arbitrum } from "wagmi/chains";
import { createConfig, http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [mainnet, zora, arbitrum, base, polygon, optimism, arbitrum],
  // https://chainlist.org/ if need other rpcs
  transports: {
    [mainnet.id]: http(),
    [zora.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});