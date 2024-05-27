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
}

export const trackedNfts: ContractAddress[] = [
  // jvmi
  { address: '0x20479B19Ca05e0b63875a65ACf24d81cd0973331', chainId: ChainId.BASE, startDate: 1716825600, endDate: 1716911940, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'jvmi', art: '/nfts/jvmi.jpg' },
  // Rick Crane
  { address: '0x7756a5315346ba448698D3d593238AC4e0E9fCdB', chainId: ChainId.BASE, startDate: 1716566400, endDate: 1716652740, price: "0.002", mintFee: '0.0008', source: 'Decent', artist: 'Rick Crane', art: '/nfts/rick-crane.jpg' },
  // Amber
  { address: '0xe223dF3cF0953048eb3c575abcD81818C9ea74B8', chainId: ChainId.BASE, startDate: 1716480000, endDate: 1716566400, price: "0.0008", mintFee: '0.0008', source: 'Decent', artist: 'Amber Vittoria', art: '/nfts/amber.jpg' },
];