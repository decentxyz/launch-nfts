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
];
