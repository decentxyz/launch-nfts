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

const Mint: NextPage = (props: any) => {
  // const {
  //   query: { address },
  //   contractData
  // } = props;
  const { address: account } = useAccount();
  const [activeTab, setActiveTab] = useState('Mint');
  const [mintInfo, setMintInfo] = useState<MintInfo>();

  const contractData = [
  {
    id: '0x05b8ee5658f3ad6c268c08b7a70f2fb4b10cf348',
    slug: 'deekay-motion-new-era-btc',
    createdAt: '2023-08-09T16:42:20.655Z',
    name: 'DeeKay Motion - New Era BTC',
    image: 'https://lh3.googleusercontent.com/icLlCsZu3XGpN2YSUuIXGzFeoCSlHz2cc1roSsJGfvvXdI7EMqJY_eymXdc12NByZ22uDRSVb5r67kReYAHo9pz9AZuVqyrb9Q',
    banner: null,
    discordUrl: null,
    externalUrl: null,
    twitterUsername: null,
    openseaVerificationStatus: null,
    description: null,
    sampleImages: [
      'https://lh3.googleusercontent.com/icLlCsZu3XGpN2YSUuIXGzFeoCSlHz2cc1roSsJGfvvXdI7EMqJY_eymXdc12NByZ22uDRSVb5r67kReYAHo9pz9AZuVqyrb9Q',
      'https://lh3.googleusercontent.com/icLlCsZu3XGpN2YSUuIXGzFeoCSlHz2cc1roSsJGfvvXdI7EMqJY_eymXdc12NByZ22uDRSVb5r67kReYAHo9pz9AZuVqyrb9Q',
      'https://lh3.googleusercontent.com/icLlCsZu3XGpN2YSUuIXGzFeoCSlHz2cc1roSsJGfvvXdI7EMqJY_eymXdc12NByZ22uDRSVb5r67kReYAHo9pz9AZuVqyrb9Q',
      'https://ipfs.io/ipfs/QmQh9g4QtmFBcHV97Wenpbcq4xT5p33RDRx7W13nmyvXeb/photo_4_2023-08-09_11-04-12.jpg'
    ],
    tokenCount: '26221',
    onSaleCount: '433',
    primaryContract: '0x05b8ee5658f3ad6c268c08b7a70f2fb4b10cf348',
    tokenSetId: 'contract:0x05b8ee5658f3ad6c268c08b7a70f2fb4b10cf348',
    creator: null,
    royalties: null,
    allRoyalties: null,
    floorAsk: {
      id: '0x48060bd93a146fea1f3c7db974462db952a29fa67e7d08cb7fc513d561b81a14',
      sourceDomain: 'opensea.io',
      price: [Object],
      maker: '0xf18ca3753c5bba51b97fd410542ca739b4de5e71',
      validFrom: 1692041222,
      validUntil: 1694440260,
      token: [Object]
    },
    topBid: {
      id: null,
      sourceDomain: null,
      price: null,
      maker: null,
      validFrom: null,
      validUntil: null
    },
    rank: { '1day': 8, '7day': null, '30day': null, allTime: 3 },
    volume: {
      '1day': 1.13452,
      '7day': 11.55279,
      '30day': 11.55279,
      allTime: 11.55279
    },
    volumeChange: { '1day': 1.4836054762512851, '7day': null, '30day': null },
    floorSale: { '1day': 0.0035, '7day': null, '30day': null },
    floorSaleChange: { '1day': 2.277142857142857, '7day': null, '30day': null },
    collectionBidSupported: true,
    ownerCount: 15849,
    contractKind: 'erc721',
    mintedTimestamp: null,
    mintStages: []
  }
]

  // useEffect(() => {
  //   const data = getMintInfo(contractData[0].primaryContract.toLowerCase(), 1, account);
  //   setMintInfo(data)
  // }, [account, contractData]);

  return (
    <>
    <MintNavbar address={'0x05b8ee5658f3ad6c268c08b7a70f2fb4b10cf348'} all />
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
            {activeTab === 'Mint' && mintInfo ? <>
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

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const { address } = context.query
//   let nftData: any;

//   if (address) {
//     nftData = await getContractData([address])
//   }

//   console.log(nftData)

//   return {
//     props: {
//       contractData: nftData || null,
//       query: context.query,
//     }
//   }
// };