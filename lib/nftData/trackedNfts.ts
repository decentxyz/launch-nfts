import { Address } from "viem";
import { ChainId } from "@decent.xyz/box-common";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

export interface ContractAddress {
  address: Address;
  chainId: ChainId;
  source: "Zora" | "Anotherblock" | "ThirdWeb" | "Decent" | "Manifold" | "Highlight" | "Nfts2Me";
  price: string;
  artist: string;
  startDate: number;
  endDate: number;
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
  // dora
  { address: '0x896037d93A231273070dd5F5c9a72aba9A3Fe920', chainId: ChainId.ZORA, startDate: 1717088400, endDate: 1722312000, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Dora', art: '/nfts/dora.gif' },
  // Enjoy
  { address: '0x0E39715Ca6208EC6b5094FF9E4699A32EbAb9a3f', chainId: ChainId.ZORA, startDate: 1713538800, endDate: 1722520800, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Enjoy', art: '/nfts/enjoy.png' },
  // From the ashes
  { address: '0xa9de16b1484C11b481B23dbdEC534a29F5668a22', chainId: ChainId.OPTIMISM, startDate: 1709139600, endDate: 4294967295, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Decent', art: '/nfts/decent-v2.mov' },
  // LZ NFT
  { address: '0xE4e2f17E439eeB2345baE76B6A4F634c3A708015', chainId: ChainId.ARBITRUM, startDate: 1708952400, endDate: 1719720000, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Layer Zero', art: '/nfts/lz-nft.mp4' },
  // Conduit partnership
  { address: '0x6e84581Ecf6FbfffAA309359EB067Ec2Df20e5B7', chainId: ChainId.OPTIMISM, startDate: 1708351200, endDate: 1719720000, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Conduit', art: '/nfts/conduit-nft.mp4' },
  // Caldera partnership
  { address: '0x903bc2Bd67a31aA628B18CaB56bbB33Cd7Ce2d5c', chainId: ChainId.ARBITRUM, startDate: 1705546800, endDate: 1719780374, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Caldera', art: '/nfts/caldera.mp4' },
  // Optimism Superchain
  { address: '0xe736729Ee572CDF69df6A92eEb751C27311355a5', chainId: ChainId.OPTIMISM, startDate: 1703246400, endDate: 1705035600, price: "0", mintFee: '0.0008', source: 'Decent', artist: 'Optimism', art: '/nfts/superchain.mp4' },
];

export const orderedNfts = (nftData?: any) => {
  let activeNfts: ContractAddress[] = [];
  let activeNftData = [];
  
  trackedNfts.forEach((nft: ContractAddress) => {
    activeNfts.push(nft);
  });

  if (nftData) {
    const activeNftsIndexMap = new Map<string, number>();
    activeNfts.forEach((nft, index) => {
      activeNftsIndexMap.set(nft.address.toLowerCase(), index);
    });
  
    activeNftData.length = activeNfts.length;
  
    nftData.forEach((nft: any) => {
      const address = nft.primaryContract.toLowerCase();
      const index = activeNftsIndexMap.get(address);
      if (index !== undefined) {
        activeNftData[index] = nft;
      }
    });
  
    return {
      activeNfts,
      activeNftData
    };
  } else {
    return {
      activeNfts,
      activeNftData: undefined
    }
  }
}