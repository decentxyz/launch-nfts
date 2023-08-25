import { NextPage } from 'next';
import MintNavbar from '../components/Navbars/MintNavbar';
import { getContractData } from '../lib/nftData/getContractData';
import styles from "../styles/Home.module.css";
import NftCard from '../components/NFTs/NftCard';
import { trackedNfts } from '../lib/utils/minting/trackedNfts';
import { Address } from 'viem';

const All: NextPage = (props: any) => {
  const { contractData } = props;
  
  return (
    <>
    <MintNavbar address={"View All"} />
    {contractData ? 
      <div className={`${styles.main} px-[24px] py-40 relative`}>
        <div className='grid sm:grid-cols-2 gap-12 max-w-5xl'>
          {contractData.reverse().map((collection: any, i:number) => (
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

export default All;

export async function getStaticProps() {
  const addresses = trackedNfts.map(nft => nft.pattern !== "proxy" ? nft.address : nft.token) as Address[];
  const nftData = await getContractData(addresses);

  return {
    props: {
      contractData: nftData || null
    },
    revalidate: 3600
  }
};