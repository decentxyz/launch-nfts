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
  day: number;
  source: "Zora" | "Anotherblock" | "ThirdWeb" | "Decent" | "Manifold" | "Highlight" | "Nfts2Me";
  price: string;
  artist?: string;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  id?: number;
  token?: Address;
  pattern?: 'proxy';
  mintFee: string;
  art: string;
}

export interface MintInfoProps {
  mintMethod: string;
  params: any;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  price: string;
  mintFee: string;
  totalPrice: string;
  day: number;
}

export const trackedNfts: ContractAddress[] = [
  // Amber
  { address: '0xe223dF3cF0953048eb3c575abcD81818C9ea74B8', chainId: ChainId.BASE, startDate: 0, endDate: 4294967295, price: "0.0008", mintFee: '0.0008', source: 'Decent', artist: 'Amber Vittoria', day: 1716447599, art: '/nfts/amber.jpg' },
];