import { GetServerSideProps, NextPage } from 'next';
import { getContractData } from '../../lib/nftData/getContractData';
import MintNavbar from '../../components/Navbars/MintNavbar';
import styles from "../../styles/Home.module.css";
import Image from 'next/image';
import Link from 'next/link';
import MintFooter from '../../components/Footers/MintFooter';
import { getMintInfo, MintInfo } from "../../lib/utils/minting/trackedNfts";
import { useAccount } from "wagmi";
import { BaseScan } from "../../lib/utils/logos";
import { useState, useEffect } from 'react';
import { convertTimestamp } from '../../lib/utils/convertTimestamp';
import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { parseUnits } from "viem";

export default function MintPage(props: any) {
  const {
    query: { address },
    // cachedContract,
    // contractData
  } = props;
  
  const { address: account } = useAccount();
  const [activeTab, setActiveTab] = useState('Mint');
  const [mintInfo, setMintInfo] = useState<MintInfo>();
  const [contractData, setContractData] = useState<any>()

  useEffect(() => {
    const data = getMintInfo('0x05b8ee5658f3ad6c268c08b7a70f2fb4b10cf348', 1, account);
    setMintInfo(data);
  }, [account]);

  useEffect(() => {
    async function load() {
      const data = await getContractData([address]);
      setContractData(data)
    }
    load()
  }, [address]);
  if (contractData) console.log("Heeeea", contractData)

  return (
    <>
    <MintNavbar address={address} />
    <div className={`${styles.main} px-[24px] py-[12px] relative`}>
      <div className='flex md:flex-wrap flex-wrap-reverse md:gap-0 gap-12 md:mt-0 mt-40 w-full relative'>
        <div className='md:w-1/2 w-full h-full pr-8 relative'>
          {/* <p className="font-thin text-7xl">{contractData[0].name}</p>

          <div className='pt-10 mb-2 md:w-[500px] border-b border-black flex justify-center'>
            <div className='pb-2 flex text-xl'>
              <button onClick={() => setActiveTab('Mint')} className={`${activeTab !== 'Mint' && 'text-gray-500 font-thin'} pr-16 border-r border-black hover:text-opacity-80`}>Mint</button>
              <button onClick={() => setActiveTab('Details')} className={`${activeTab !== 'Details' && 'text-gray-500 font-thin'} pl-16 hover:text-opacity-80`}>Details</button>
            </div>
          </div> */}
          <div>
            {activeTab === 'Mint' && mintInfo && contractData ? <>
              <TheBox
                className="text-xs md:max-w-[500px] bg-white bg-opacity-50"
                paymentButtonText="Pay now"
                actionType={ActionType.NftPreferMint}
                actionConfig={{
                  contractAddress: contractData[0].primaryContract,
                  chainId: ChainId.BASE,
                  signature: mintInfo.mintMethod,
                  args: mintInfo.params,
                  cost: {
                    isNative: true,
                    amount: parseUnits(mintInfo.price, 18),
                  },
                }}
                apiKey='105a75d8ff0a9ee14015ba4c30f9d550'
              />
            </> : <>
              {/* <div className='flex items-center md:w-[500px] justify-between flex-wrap gap-2 text-sm font-thin py-4'>
                <p>Mint start: {convertTimestamp(mintInfo?.startDate)}</p>
                <p>Mint end: {convertTimestamp(mintInfo?.endDate) || 'Open'}</p>
                <p>Max tokens: {mintInfo?.maxTokens || 'Open'}</p>
                <Link target="_blank" className='flex gap-2' href={`https://basescan.org/address/${contractData[0].primaryContract || ''}`}>{BaseScan(18, 20)} <span className='underline'> View on Basescan</span></Link> 
              </div>
              <p className='mt-8 md:w-[500px] overflow-y-auto max-h-[250px]'>{contractData[0].description}</p> */}
            </>
            }
            {
            contractData && JSON.stringify(contractData)
            }
          </div>
        </div>

        {/* <div className='md:w-1/2 w-full flex justify-center'>
          <Image src={contractData[0].image} height={500} width={500} alt="nft image" className='rounded-md' />
        </div> */}
      </div>
      {/* <MintFooter contractData={contractData} /> */}
    </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { chainId, address } = context.query;

  let cachedContract;
  let contractData;

  // if (chainId && address) {
  //   try {
  //     cachedContract = await getContractInfo(chainId, address);
  //     contractData = await getContractData(chainId, address, "Editions")
  //   } catch (e) {
  //     console.log("contract not yet indexed: ", e);
  //   }
  // }

  return {
    props: {
      notFound: process.env.NODE_ENV !== "development",
      query: context.query,
      // cachedContract: cachedContract || null,
      // contractData: contractData || null,
    },
  };
};
