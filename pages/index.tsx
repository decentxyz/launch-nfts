import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useChainData } from '../lib/nftData/useChainData';
import Navbar from '../components/Navbars/Navbar';
import FeaturedNftContainer from "../components/NFTs/FeaturedNftContainer";
import { FeaturedNftContextProvider } from '../lib/contexts/FeaturedNftContext';
import { SearchContextProvider } from '../lib/contexts/SearchContext';
import Footer from '../components/Footers/Footer';
import Link from 'next/link';
import { getContractData } from '../lib/nftData/getContractData';
import { trackedNfts } from '../lib/utils/minting/trackedNfts';
import { Address } from 'viem';

const Home: NextPage = ({ contractData }: any) => {
  const today = new Date().toLocaleDateString();
  const { chainData, loadingChainData } = useChainData(today);

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
          {contractData && <>
            <FeaturedNftContainer nftData={contractData} />
            <Footer nftData={contractData} />
          </>}
        </main>
      </FeaturedNftContextProvider>

    </SearchContextProvider>
  </>
};

export default Home;

export async function getStaticProps() {
  const addresses = trackedNfts.map(nft => nft.pattern !== "proxy" ? nft.address : nft.token) as Address[];
  const nftData = await getContractData(addresses.slice(-4));
  return {
    props: {
      contractData: nftData || null,
    },
    revalidate: 300
  }
};