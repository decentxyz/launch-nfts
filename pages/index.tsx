import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbars/Navbar';
import FeaturedNftContainer from "../components/NFTs/FeaturedNftContainer";
import { FeaturedNftContextProvider, useFeaturedNftContext } from '../lib/contexts/FeaturedNftContext';
import Footer from '../components/Footers/Footer';
import { getContractData } from '../lib/nftData/getContractData';
import { trackedNfts } from '../lib/nftData/trackedNfts';
import { Address } from 'viem';
import { ChainId } from '@decent.xyz/box-common';
import MintBox from '../components/NFTs/MintBox';

const Home: NextPage = ({ contractData }: any) => {
  return (
    <FeaturedNftContextProvider>
      <Navbar />
      <MainContent contractData={contractData} />
    </FeaturedNftContextProvider>
  );
};

const MainContent = ({ contractData }: any) => {
  const { middleIndex } = useFeaturedNftContext();

  function sortNFTsByMintedTimestamp(nfts: any) {
    return nfts.sort((a: any, b: any) => b.mintedTimestamp - a.mintedTimestamp);
  }

  const sortedContractData = sortNFTsByMintedTimestamp(contractData);
  const activeNft = sortedContractData[middleIndex];

  return (
    <main className={`${styles.main} relative`} style={{ minHeight: '100vh' }}>
      {contractData && (
        <>
          <FeaturedNftContainer nftData={sortedContractData} />
          <div>
            <MintBox collection={activeNft} />
          </div>
          <Footer nftData={contractData} />
        </>
      )}
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const nftsByChainId: { [key in ChainId]?: string[] } = trackedNfts.reduce((acc: { [key in ChainId]?: Address[] }, nft) => {
    const address = nft.pattern !== "proxy" ? nft.address : nft.token;
    if (!acc[nft.chainId]) {
      acc[nft.chainId] = [];
    }
    acc[nft.chainId]!.push(address!);
    return acc;
  }, {});

  const contractDataPromises = Object.entries(nftsByChainId).map(([chainId, addresses]) => {
    const cleanAddresses = addresses as `0x${string}`[];
    const cleanChainId = chainId as unknown as ChainId;
    return getContractData(cleanAddresses, cleanChainId).then(data => ({
      chainId,
      data
    }));
  });

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
    revalidate: 300,
  };
}
