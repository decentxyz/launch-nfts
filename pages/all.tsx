import { NextPage } from 'next';
import { useState } from 'react';
import MintNavbar from '../components/Navbars/MintNavbar';
import { getContractData } from '../lib/nftData/getContractData';
import styles from "../styles/Home.module.css";
import NftCard from '../components/NFTs/NftCard';
import { trackedNfts } from '../lib/nftData/trackedNfts';
import { Address } from 'viem';
import { ChainId } from '@decent.xyz/box-common';
import { useRunSearch } from '../lib/runSearch';

const Explore = ({ contractData }: { contractData: any }) => {

  function sortNFTsByMintedTimestamp(nfts: any) {
    return nfts.sort((a: any, b: any) => b.mintedTimestamp - a.mintedTimestamp);
  }

  const sortedContractData = sortNFTsByMintedTimestamp(contractData);
  const [sortedNftData, setSortedNftData] = useState(sortedContractData); 
  useRunSearch({
    nftData: contractData,
    sortedNfts: sortedNftData,
    setSortedNfts: setSortedNftData
  })
  
  return (
    <>
    <MintNavbar all={true} />
    {contractData ? 
      <div className={`${styles.main}  px-[24px] relative`}>
        <div className='grid sm:grid-cols-2 gap-12 max-w-5xl py-40'>
          {sortedNftData.map((collection: any, i:number) => (
            <div key={i} className='w-[360px] h-[360px] md:w-[400px] md:h-[400px]'>
              <NftCard index={i} collection={collection} cardView={true} />
            </div>
          ))}
        </div>
      </div>
      : <div className='w-full h-full flex justify-center items-center'>loading...</div>}
    </>
  )
}

export default Explore;

export async function getStaticProps() {
  // Group NFTs by chainId
  const nftsByChainId: { [key in ChainId]?: string[] } = trackedNfts.reduce((acc: { [key in ChainId]?: Address[] }, nft) => {
    const address = nft.pattern !== "proxy" ? nft.address : nft.token;
    if (!acc[nft.chainId]) {
      acc[nft.chainId] = [];
    }
    acc[nft.chainId]!.push(address!);
    return acc;
  }, {});

  // Fetch contract data for each group
  const contractDataPromises = Object.entries(nftsByChainId).map(([chainId, addresses]) => {
    const cleanAddresses = addresses as `0x${string}`[];
    const cleanChainId = chainId as unknown as ChainId;
    return getContractData(cleanAddresses, cleanChainId).then(data => ({
      chainId,
      data
    }));
  });
  

  // Await all promises and combine results
  type Data = any;
  const contractDataResults = await Promise.all(contractDataPromises);
  
  const contractData = contractDataResults.reduce<Data[]>((acc, { chainId, data }) => {
    data.forEach((item: any) => acc.push({ chainId, ...item }));
    return acc;
  }, []);

  return {
    props: {
      contractData: contractData || null
    },
    revalidate: 300
  }
};