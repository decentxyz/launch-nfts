import { Address } from "viem";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

interface ContractAddress {
  address: Address;
  source: "Zora" | "Anotherblock" | "ThirdWeb" | "Decent" | "Manifold" | "Highlight" | "Nfts2Me";
  price: string;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  id?: number;
  token?: Address;
  pattern?: 'proxy';
}

export interface MintInfoProps {
  mintMethod: string;
  params: any;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  price: string;
}

export const trackedNfts: ContractAddress[] = [
  // Base Day 1
  { address: '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89', startDate: 1691593200, endDate: 1693551600, price: "0.000777", source: 'Zora'},
  // Bridge to Base
  { address: '0xea2a41c02fa86a4901826615f9796e603c6a4491', startDate: 1690999814, endDate: 1693551600, price: "0.0", source: "ThirdWeb" },
  //FWB
  { address: '0xc9cca8e570f81a7476760279b5b19cc1130b7580', startDate: 1691593200, endDate: 1691769600, price: "0.01", source: "ThirdWeb" },
  // anotherblock - jb
  { address: '0xD3d333E6FeD17f273D0415Df567ed5Eb65e8BB28', startDate: 1694089317, price: "0.017", maxTokens: 2000, source: "Anotherblock" },
  // stand with crypto
  { address: '0x874ad7c13935f73c7bbe94efbd8e766de2a585eb', startDate: 1691766000, endDate: 4294967295, price: "0.0", source: "ThirdWeb" },
  // Paragon
  { address: '0xb999Ec5E57000540cBF821aDdbc69C37bF506f9F', startDate: 1692190800, endDate: 4294967295, price: "0.000777", source: "Zora" },
  // Decent (not OCS but do want featured)
  { address: '0x0a1732C70C06c343cd10Be60ce63eFa492803224', startDate: 1692240100, endDate: 1692934200, price: "0.00044", source: "Decent" },
  // Optimism - Onchain + Optimistic
  { address: '0x6f4168C0207df6561527af1059D788BB0b09beB1', startDate: 1692892800, endDate: 1693497600, price: "0.001", source: "ThirdWeb" },
  { address: '0x6171F829e107F70B58D67594c6B62A7d3eb7F23B', startDate: 1692937043, endDate: 1693324800, price: "0.000", source: "ThirdWeb" },
  // // Highlight - 1kTF : PROXY PATTERN I'M NOT SURE ABOUT
  { address: '0xC9D128f88a8d97342a37680F0CE0F34598F289D0', startDate: 1692240100, endDate: 1693298197, price: "0.005", source: "Highlight", id: 31, pattern: "proxy" },
  // Nfts2Me - Colors; view details: https://0x481cf23d56113163c42f825f94af646f0e73222b_8453.nfts2.me/
  { address: "0x481cf23D56113163C42f825f94AF646f0E73222b", startDate: 1695471742, maxTokens: 5555, price: "0.00001", source: "Nfts2Me" },
];
