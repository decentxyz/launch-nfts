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

const Home: NextPage = () => {
  const today = new Date().toLocaleDateString();
  const { chainData } = useChainData(today);
  // Pull out to separate component where I can manage these
  const { nftData, loadingNftData, errorNftData } = useNftData([
    '0xC85f505B43FcbFFBF7808A55bC4E8ceCAC18D85B', 
    '0xECDE63c35a69F378b4fa83b5D5506F64e3DaBbbC', 
    '0x90fb81ca2fec713c9c6b4b2694eded668b85d5ed',
    '0x8b559fba48051ca930a646493ca3fcf1c7fe1bf9', 
    '0x1a126d5d53815e44d8635f3a7e4547cf3dedced9'
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
      <meta property='og:url' content={"https://featured.decent.xyz/"} />
      <meta property='og:image' content={""} />
      <meta property='og:title' content={""} />
      <meta property='og:description' content={""} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://featured.decent.xyz/"} />
      <meta name='twitter:title' content={""} />
      <meta name='twitter:description' content={""} />
      <meta name='twitter:image' content={""} />
    </Head>
    <SearchContextProvider>
      <Navbar oneDay={chainData?.targetDateStats["1day"]} sevenDay={chainData?.targetDateStats["7day"]} />
    
      <FeaturedNftContextProvider>
        <main className={`${styles.main} relative`} style={{ minHeight: '100vh' }}>
          {nftData && <>
            <FeaturedNftContainer nftData={nftData} />
            <Footer nftData={nftData} isLoading={loadingNftData} error={errorNftData} />
          </>}
        </main>
      </FeaturedNftContextProvider>

    </SearchContextProvider>
  </>
};

export default Home;