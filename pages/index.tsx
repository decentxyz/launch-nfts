import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useChainData } from '../lib/nftData/useChainData';
import { useNftData } from '../lib/nftData/useNftData';
import Navbar from '../components/Navbars/Navbar';
import FeaturedNftContainer from "../components/NFTs/FeaturedNftContainer";
import { FeaturedNftContextProvider } from '../lib/contexts/FeaturedNftContext';
import { SearchContextProvider } from '../lib/contexts/SearchContext';
import Footer from '../components/Footers/Footer';
import Link from 'next/link';
import { getOcsNfts } from '../lib/utils/minting/trackedNfts';

const Home: NextPage = () => {
  const today = new Date().toLocaleDateString();
  const { chainData, loadingChainData } = useChainData(today);
  const ocsAddresses = getOcsNfts();
  // Only featuring OCS NFTs on this page
  const { nftData, loadingNftData, errorNftData } = useNftData(ocsAddresses);

  return <>
    <SearchContextProvider>
      <Navbar oneDay={chainData?.oneDay} sevenDay={chainData?.sevenDay} isLoading={loadingChainData} />
    
      <FeaturedNftContextProvider>
        <main className={`${styles.main} relative`} style={{ minHeight: '100vh' }}>
          <div className='flex w-full px-[24px]'>
            <div className='w-full sm:hidden flex justify-start'>
              <p className='text-right font-thin text-xs'>Swipe {'→'}</p>
            </div>
            <div className='w-full flex justify-end'>
              <Link href="/all" className='text-right font-thin text-xs hover:text-[#0052FF]'>View All {'→'}</Link>
            </div>
          </div>
          {!loadingNftData && !errorNftData && <>
            <FeaturedNftContainer nftData={nftData} />
            <Footer nftData={nftData} isLoading={loadingNftData} error={errorNftData} />
          </>}
        </main>
      </FeaturedNftContextProvider>

    </SearchContextProvider>
  </>
};

export default Home;