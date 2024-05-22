import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbars/Navbar';
import FeaturedNftContainer from "../components/NFTs/FeaturedNftContainer";
import { FeaturedNftContextProvider } from '../lib/contexts/FeaturedNftContext';
import Footer from '../components/Footers/Footer';
import Link from 'next/link';
import { getContractData } from '../lib/nftData/getContractData';
import { trackedNfts } from '../lib/nftData/trackedNfts';
import { Address } from 'viem';
import { ChainId } from '@decent.xyz/box-common';
import CountdownText from '../components/CountdownText';
import { getEndOfDayDate } from '../lib/useCountdown';

const Home: NextPage = ({ contractData }: any) => {
  function sortNFTsByMintedTimestamp(nfts: any) {
    return nfts.sort((a: any, b: any) => b.mintedTimestamp - a.mintedTimestamp);
  }

  const sortedContractData = sortNFTsByMintedTimestamp(contractData);

  return <>
    <Navbar />
    <FeaturedNftContextProvider>
      <main className={`${styles.main} relative`} style={{ minHeight: '100vh' }} >
        <div className='flex w-full'>
          <div className='w-full flex justify-between font-thin text-xs'>
            <CountdownText dropTime={getEndOfDayDate()} />
            <Link href="/all" className='text-right hover:text-primary pb-2'>View All {'→'}</Link>
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