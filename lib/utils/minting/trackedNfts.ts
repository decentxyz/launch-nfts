import { Address } from "viem";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

interface ContractAddress {
  address: Address;
  ocs: boolean;
  source: "Zora" | "Anotherblock" | "ThirdWeb" | "Decent";
  price: string;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
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
  { address: '0x33eD5107f821bb1465da30B7dCe4Fb7105B0Ad16', ocs: true, startDate: 1691856000, endDate: 1692028800, price: "0.0011", source: "Anotherblock" },
  { address: '0x0c664A85521d5721bca047d29238d9E2a9E9e861', ocs: true, startDate: 1691856000, endDate: 1692028800, price: "0.00055", source: "Anotherblock" },
  // coke
  { address: '0x916555cd5f02e159b84d5247f8660531a4525d2d', ocs: true, startDate: 1691938800, endDate: 1692201600, price: "0.014", source: "ThirdWeb" },
  // stand with crypto
  { address: '0x874ad7c13935f73c7bbe94efbd8e766de2a585eb', ocs: true, startDate: 1691766000, endDate: 4294967295, price: "0.0", source: "ThirdWeb" },
  //Helmet city
  { address: '0x0651996b6a6eebd1fc697e5735a2dca541bbe06b', ocs: false, startDate: 1692201600, endDate: 4294967295, price: "0.000777", source: "Zora" },
  // Heno
  { address: '0x6eE6E88Eb8ae143bb9B4B4B0A2269A080a45ef7E', ocs: false, startDate: 1692201600, endDate: 1692460800, price: "0.000777", source: "Zora" },
  // Paragon
  { address: '0xb999Ec5E57000540cBF821aDdbc69C37bF506f9F', ocs: false, startDate: 1692190800, endDate: 4294967295, price: "0.000777", source: "Zora" },
  // Soulquest
  { address: '0x4535a60b6f8f460fc8b69eb902c15d7db5e0425f', ocs: false, startDate: 1692169313, endDate: 1693492824, price: "0.005777", source: "Zora" },
  // Base Builder
  { address: '0x7EDF39FB9cC5446590A674a3f571E4a99A211d80', ocs: false, startDate: 1692243819, endDate: 4294967295, price: "0.0", source: "ThirdWeb" },
  // Summer Kevin
  { address: '0x9d9c0C4e764117FccD2bc3548f0E95c806e6F996', ocs: true, startDate: 1692287700, endDate: 4294967295, price: "0.001", source: "ThirdWeb" },
  // Summer Zorb
  // { address: '0xBd52c54aB5116b1D9326352F742E6544FfdEB2cB', ocs: true, startDate: 1691593200, endDate: 1693540800, price: "0.000777" },
  // Decent (not OCS but do want featured)
  { address: '0x0a1732C70C06c343cd10Be60ce63eFa492803224', ocs: true, startDate: 1692240100, endDate: 1692934200, price: "0.00044", source: "Decent" },
];