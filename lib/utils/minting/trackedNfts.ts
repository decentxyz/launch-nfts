import { Address } from "viem";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

interface ContractAddress {
  address: Address;
  ocs: boolean;
  source: "Zora" | "Anotherblock" | "ThirdWeb" | "Decent" | "Manifold" | "Highlight";
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

export const getOcsNfts = () => {
  return trackedNfts
    .filter(item => item.ocs === true)
    .map(item => item.address);
}

export const trackedNfts: ContractAddress[] = [
  // Base Day 1
  { address: '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89', ocs: true, startDate: 1691593200, endDate: 1693551600, price: "0.000777", source: 'Zora'},
  // Bridge to Base
  { address: '0xea2a41c02fa86a4901826615f9796e603c6a4491', ocs: false, startDate: 1690999814, endDate: 1693551600, price: "0.0", source: "ThirdWeb" },
  //FWB
  { address: '0xc9cca8e570f81a7476760279b5b19cc1130b7580', ocs: true, startDate: 1691593200, endDate: 1691769600, price: "0.01", source: "ThirdWeb" },
  // anotherblock
  { address: '0x8b2937eAD425CCC91Fc0ad884638Dc2129c51CB2', ocs: true, startDate: 1691856000, endDate: 1692028800, price: "0.0022", source: "Anotherblock" },
  // coke
  { address: '0x916555cd5f02e159b84d5247f8660531a4525d2d', ocs: true, startDate: 1691938800, endDate: 1692201600, price: "0.014", source: "ThirdWeb" },
  // stand with crypto
  { address: '0x874ad7c13935f73c7bbe94efbd8e766de2a585eb', ocs: true, startDate: 1691766000, endDate: 4294967295, price: "0.0", source: "ThirdWeb" },
  // Heno
  { address: '0x6eE6E88Eb8ae143bb9B4B4B0A2269A080a45ef7E', ocs: false, startDate: 1692201600, endDate: 1692460800, price: "0.000777", source: "Zora" },
  // Paragon
  { address: '0xb999Ec5E57000540cBF821aDdbc69C37bF506f9F', ocs: false, startDate: 1692190800, endDate: 4294967295, price: "0.000777", source: "Zora" },
  // Decent (not OCS but do want featured)
  { address: '0x0a1732C70C06c343cd10Be60ce63eFa492803224', ocs: true, startDate: 1692240100, endDate: 1692934200, price: "0.00044", source: "Decent" },
  // Optimism - Onchain + Optimistic
  { address: '0x6f4168C0207df6561527af1059D788BB0b09beB1', ocs: true, startDate: 1692892800, endDate: 1693497600, price: "0.001", source: "ThirdWeb" },
  { address: '0x6171F829e107F70B58D67594c6B62A7d3eb7F23B', ocs: true, startDate: 1692937043, endDate: 1693324800, price: "0.000", source: "ThirdWeb" },

  // // Manifold - CAV!TY : PROXY PATTERN I'M NOT SURE ABOUT
  // { address: '0x1EB73FEE2090fB1C20105d5Ba887e3c3bA14a17E', ocs: true, startDate: 1692240100, endDate: 1692849410, price: "0.0044", source: "Manifold", id: 69609712, token: "0xF950F846B4393ED802569Ce993F27CECd5949673", pattern: 'proxy' },

  // // Highlight - 1kTF : PROXY PATTERN I'M NOT SURE ABOUT
  // { address: '0xC9D128f88a8d97342a37680F0CE0F34598F289D0', ocs: true, startDate: 1692240100, endDate: 1693298197, price: "0.005", source: "Highlight", id: 31 },
];
