import { Address } from "viem";
import { ChainId } from "@decent.xyz/box-common";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

interface ContractAddress {
  address: Address;
  chainId: ChainId;
  source: "Zora" | "Anotherblock" | "ThirdWeb" | "Decent" | "Manifold" | "Highlight" | "Nfts2Me";
  price: string;
  partner?: string;
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

export enum PartnerLogos {
  'CSCOPE' = '/images/caldera.png',
  'SUPER' = '/images/optimism.svg',
}

export enum VideoDict {
  'CSCOPE' = '/nfts/caldera.mp4',
  'SUPER' = 'nfts/superchain.mp4'
}

export const trackedNfts: ContractAddress[] = [
  // Calderascope
  { address: '0x903bc2Bd67a31aA628B18CaB56bbB33Cd7Ce2d5c', chainId: ChainId.ARBITRUM, startDate: 1705546800, endDate: 1706848200, price: "0.00044", source: 'Decent', partner: 'Caldera'},
  // Optimism Superchain
  { address: '0xe736729Ee572CDF69df6A92eEb751C27311355a5', chainId: ChainId.OPTIMISM, startDate: 1703246400, endDate: 1705035600, price: "0.00044", source: 'Decent', partner: 'Optimism'},
  // Squid Stardance
  { address: '0x3146975BFCCAE722F802BC0Cd540dB1e6c178D1F', chainId: ChainId.POLYGON, startDate: 1692190800, endDate: 1693400400, price: "0.81", source: 'Decent', partner: 'Squid'},
  // Super Based Box
  { address: '0x0a1732C70C06c343cd10Be60ce63eFa492803224', chainId: ChainId.BASE, startDate: 1692240100, endDate: 1692934200, price: "0.00044", source: 'Decent', partner: 'Base'},
  // OP RPGF3
  { address: '0xd89dBBd35C24E07C7727BF1eF36cd1F02aEA158E', chainId: ChainId.OPTIMISM, startDate: 1687361400, endDate: 1687966200, price: "0.00044", source: 'Decent', partner: 'Optimism'},
];
