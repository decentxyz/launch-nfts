import { mainnet, zora, base, polygon, optimism, arbitrum } from "viem/chains";
import { createConfig, http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [mainnet, zora, base, polygon, optimism, arbitrum],
  // https://chainlist.org/
  transports: {
    [mainnet.id]: http('https://rpc.flashbots.net'),
    [zora.id]: http('https://rpc.zora.energy'),
    [base.id]: http('https://base.drpc.org'),
    [polygon.id]: http('https://polygon-pokt.nodies.app'),
    [optimism.id]: http('https://optimism.llamarpc.com'),
    [arbitrum.id]: http('https://arbitrum.drpc.org'),
  },
});