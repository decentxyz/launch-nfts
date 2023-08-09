import { NextPage } from 'next';
import MintNavbar from '../components/Navbars/MintNavbar';
import { getAllContractData } from '../lib/nftData/getContractData';
import styles from "../styles/Home.module.css";
import NftCard from '../components/NFTs/NftCard';

const Mint: NextPage = (props: any) => {
  const { contractData } = props;

  return (
    <>
    <MintNavbar address={"View All"} />
    <div className={`${styles.main} px-[24px] py-40 relative`}>
      <div className='grid sm:grid-cols-2 gap-12 max-w-5xl'>
        {contractData.map((collection: any, i:number) => (
          <div key={i} className='w-[360px] h-[360px] md:w-[400px] md:h-[400px]'>
            <NftCard index={i} collection={collection} cardView={true} />
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Mint;

export async function getServerSideProps() {
  const addresses = [
    '0xC85f505B43FcbFFBF7808A55bC4E8ceCAC18D85B', 
    '0xECDE63c35a69F378b4fa83b5D5506F64e3DaBbbC', 
    '0x90fb81ca2fec713c9c6b4b2694eded668b85d5ed',
    '0x8b559fba48051ca930a646493ca3fcf1c7fe1bf9', 
    '0x1a126d5d53815e44d8635f3a7e4547cf3dedced9',
    '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89'
  ]

  const nftData = await getAllContractData(addresses)

  return {
    props: {
      contractData: nftData || null
    }
  }
};