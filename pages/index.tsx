import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useChainData } from '../lib/nftData/useChainData';
import Navbar from '../components/Navbars/Navbar';
import FeaturedNftContainer from "../components/NFTs/FeaturedNftContainer";
import { FeaturedNftContextProvider } from '../lib/contexts/FeaturedNftContext';
import Footer from '../components/Footers/Footer';
import Link from 'next/link';
import { getContractData } from '../lib/nftData/getContractData';
import { trackedNfts } from '../lib/utils/minting/trackedNfts';
import { Address } from 'viem';
import { ChainId } from '@decent.xyz/box-common';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const Home: NextPage = ({ contractData }: any) => {
  const { address: account } = useAccount();
  const today = new Date().toLocaleDateString();
  const { chainData, loadingChainData } = useChainData(today);
  
  function sortNFTsByMintedTimestamp(nfts: any) {
    return nfts.sort((a: any, b: any) => b.mintedTimestamp - a.mintedTimestamp);
  }

  const sortedContractData = sortNFTsByMintedTimestamp(contractData);

  useEffect(() => {
    if (account && window) {
      window.Atlas.call("identify", {
        userId: account,
       })
    }
  }, [account]);

  return <>
    <Navbar oneDay={chainData?.oneDay} sevenDay={chainData?.sevenDay} isLoading={loadingChainData} />
    <FeaturedNftContextProvider>
      <main className={`${styles.main} relative`} style={{ minHeight: '100vh' }}>
        <div className='flex w-full px-[24px]'>
          <div className='w-full sm:hidden flex justify-start'>
            <p className='text-right font-thin text-xs'>Swipe {'→'}</p>
          </div>
          <div className='w-full flex justify-end'>
            <Link href="/all" className='text-right font-thin text-xs hover:text-primary'>View All {'→'}</Link>
          </div>
        </div>
        {contractData && <>
          <FeaturedNftContainer nftData={sortedContractData} />
          <Footer nftData={contractData} />
        </>}
      </main>
    </FeaturedNftContextProvider>    
  </>
};

export default Home;

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
      contractData: contractData || null,
    },
    revalidate: 300
  }
};