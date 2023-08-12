import { NextPage } from 'next';
import { getContractData } from '../../lib/nftData/getContractData';
import MintNavbar from '../../components/Navbars/MintNavbar';
import styles from "../../styles/Home.module.css";
import Image from 'next/image';
import Link from 'next/link';
import MintFooter from '../../components/Footers/MintFooter';
import { getMintInfo, MintInfo } from "../../lib/utils/minting/trackedNfts";
import { useAccount } from "wagmi";
import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { parseUnits } from "viem";
import { BaseScan } from "../../lib/utils/logos";
import { useState, useEffect } from 'react';
import { convertTimestamp } from '../../lib/utils/convertTimestamp';

const Mint: NextPage = (props: any) => {
  const { address, contractData } = props;
  const { address: account } = useAccount();
  const [activeTab, setActiveTab] = useState('Mint');
  const [mintInfo, setMintInfo] = useState<MintInfo>();

  useEffect(() => {
    if (account) {
      const data = getMintInfo(contractData[0].primaryContract.toLowerCase(), 1, account);
      setMintInfo(data)
    }
  }, [account, contractData]);

  return (
    <>
    <MintNavbar address={address} all />
    <div className={`${styles.main} px-[24px] py-[12px] relative`}>
      <div className='flex md:flex-wrap flex-wrap-reverse md:gap-0 gap-12 md:mt-0 mt-40 w-full relative'>
        <div className='md:w-1/2 w-full h-full pr-8 relative'>
          <p className="font-thin text-7xl">{contractData[0].name}</p>

          <div className='pt-10 mb-2 md:w-[500px] border-b border-black flex justify-center'>
            <div className='pb-2 flex text-xl'>
              <button onClick={() => setActiveTab('Mint')} className={`${activeTab !== 'Mint' && 'text-gray-500 font-thin'} pr-16 border-r border-black hover:text-opacity-80`}>Mint</button>
              <button onClick={() => setActiveTab('Details')} className={`${activeTab !== 'Details' && 'text-gray-500 font-thin'} pl-16 hover:text-opacity-80`}>Details</button>
            </div>
          </div>
          <div>
            {activeTab === 'Mint' ? <>
              <TheBox
                className="text-xs md:max-w-[500px] bg-white bg-opacity-50"
                paymentButtonText="Pay now"
                actionType={ActionType.NftMint}
                actionConfig={{
                  contractAddress: contractData[0].primaryContract,
                  chainId: ChainId.BASE,
                  signature: mintInfo?.mintMethod,
                  args: mintInfo?.params,
                  cost: {
                    isNative: true,
                    amount: parseUnits(mintInfo?.price || '0.00', 18),
                  },
                }}
                apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
              />
            </> : <>
              <div className='flex items-center md:w-[500px] justify-between flex-wrap gap-2 text-sm font-thin py-4'>
                <p>Mint start: {convertTimestamp(mintInfo?.startDate)}</p>
                <p>Mint end: {convertTimestamp(mintInfo?.endDate) || 'Open'}</p>
                <p>Max tokens: {mintInfo?.maxTokens || 'Open'}</p>
                <Link target="_blank" className='flex gap-2' href={`https://basescan.org/address/${contractData[0].primaryContract || ''}`}>{BaseScan(18, 20)} <span className='underline'> View on Basescan</span></Link> 
              </div>
              <p className='mt-8 md:w-[500px] overflow-y-auto max-h-[250px]'>{contractData[0].description}</p>
            </>
            }
          </div>
        </div>

        <div className='md:w-1/2 w-full flex justify-center'>
          <Image src={contractData[0].image} height={500} width={500} alt="nft image" className='rounded-md' />
        </div>
      </div>
      <MintFooter contractData={contractData} />
    </div>
    </>
  )
}

export default Mint;

export async function getServerSideProps(context: any) {
  const { address } = context.query

  let nftData: any;

  if (address) {
    nftData = await getContractData([address])
  }

  return {
    props: {
      address,
      contractData: nftData || null
    }
  }
};