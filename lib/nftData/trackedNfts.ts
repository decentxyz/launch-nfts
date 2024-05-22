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

export const trackedNfts: ContractAddress[] = [
  // Layer Zero Partnership
  { address: '0xE4e2f17E439eeB2345baE76B6A4F634c3A708015', chainId: ChainId.ARBITRUM, startDate: 1708952400, endDate: 1719720000, price: "0.00044", source: 'Decent', partner: 'Layer Zero'},
  // Conduit Partnership
  { address: '0x6e84581Ecf6FbfffAA309359EB067Ec2Df20e5B7', chainId: ChainId.OPTIMISM, startDate: 1708351200, endDate: 1719720000, price: "0.00044", source: 'Decent', partner: 'Conduit'},
  // Calderascope
  { address: '0x903bc2Bd67a31aA628B18CaB56bbB33Cd7Ce2d5c', chainId: ChainId.ARBITRUM, startDate: 1705546800, endDate: 1719780374, price: "0.00044", source: 'Decent', partner: 'Caldera'},
];