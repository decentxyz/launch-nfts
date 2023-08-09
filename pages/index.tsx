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

const Home: NextPage = () => {
  const today = new Date().toLocaleDateString();
  const { chainData, loadingChainData } = useChainData(today);
  // Pull out to separate component where I can manage these
  const { nftData, loadingNftData, errorNftData } = useNftData([
    '0xC85f505B43FcbFFBF7808A55bC4E8ceCAC18D85B', 
    '0xECDE63c35a69F378b4fa83b5D5506F64e3DaBbbC', 
    '0x90fb81ca2fec713c9c6b4b2694eded668b85d5ed',
    '0x8b559fba48051ca930a646493ca3fcf1c7fe1bf9', 
    '0x1a126d5d53815e44d8635f3a7e4547cf3dedced9',
    '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89'
  ]);

  return <>
    <Head>
      <title>{""}</title>
      <meta
        name="description"
        content={""}
      />
      <link rel="icon" href={""} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://basednfts.co/"} />
      <meta property='og:image' content={nftData ? nftData[0]?.image : ""} />
      <meta property='og:title' content={"Based NFTs"} />
      <meta property='og:description' content={"Mint NFTs on Base without bridging."} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://basednfts.co/"} />
      <meta name='twitter:title' content={"Based NFTs"} />
      <meta name='twitter:description' content={"Mint NFTs on Base without bridging."} />
      <meta name='twitter:image' content={nftData ? nftData[0]?.image : ""} />
    </Head>
    <SearchContextProvider>
      <Navbar oneDay={chainData?.targetDateStats["1day"]} sevenDay={chainData?.targetDateStats["7day"]} isLoading={loadingChainData} />
    
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