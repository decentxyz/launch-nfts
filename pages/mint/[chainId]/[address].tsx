import { GetServerSideProps, NextPage } from 'next';
import { getContractData } from '../../../lib/nftData/getContractData';
import MintNavbar from '../../../components/Navbars/MintNavbar';
import styles from "../../../styles/Home.module.css";
import Image from 'next/image';
import Link from 'next/link';
import MintFooter from '../../../components/Footers/MintFooter';
import { getMintInfo } from "../../../lib/nftData/getMintInfo";
import { MintInfoProps } from '../../../utils/types';
import { useAccount } from "wagmi";
import { ActionType, ChainId } from '@decent.xyz/box-common';
import { parseUnits, zeroAddress } from "viem";
import { EtherscanScan } from "../../../utils/logos";
import { useState, useEffect } from 'react';
import { convertTimestamp } from '../../../utils/convertTimestamp';
import NumberTicker from '../../../components/NumberTicker';
import { VideoDict } from '../../../lib/nftData/trackedNfts';
import { getBlockscanner } from '../../../utils/blockscanners';
import MintButton from '../../../components/MintButton';

const Mint: NextPage = (props: any) => {
  const {
    query: { address },
    contractData
  } = props;
  const { address: account, chain } = useAccount();
  const [mintInfo, setMintInfo] = useState<MintInfoProps>();
  const [quantity, setQuantity] = useState(1);
  const [soldOut, setSoldOut] = useState(false);

  useEffect(() => {
    if (account && window && Date.now() / 1000 < mintInfo?.endDate!) {
      window.Atlas.call("identify", {
        userId: account,
       })
    }
  }, [account, mintInfo?.endDate]);

  useEffect(() => {
    async function fetchMintInfo() {
      const data = getMintInfo(
        contractData[0].primaryContract.toLowerCase(),
        quantity,
        account,
        '0.00044'
      );
      setMintInfo(data);
    }
  
    fetchMintInfo();
  }, [account, contractData, quantity]);

  useEffect(() => {
    if (Date.now() / 1000 > mintInfo?.endDate! && parseInt(contractData[0].onSaleCount) === 0) {
      setSoldOut(true);
    }
  }, [contractData, mintInfo?.endDate]);

  const blockscanner = getBlockscanner(contractData[0].chainId);

  return (
    <div className='relative'>
      <MintNavbar address={address} partner={contractData[0].symbol} />

      <div className={`${styles.main} px-[24px] py-[12px] pt-[20vh] md:pt-0`}>
        <div className={`flex md:flex-wrap flex-wrap-reverse md:gap-0 gap-12 md:h-[70vh]`}>
          
          <div className='md:w-1/2 pr-8 flex-col justify-between relative'>
            <div className="font-thin h-fit pb-4 sm:pb-0 sm:h-[15vh]">
              <span className={`${
                contractData[0].name.length > 22 ? 'text-5xl' : 'text-7xl'
              } overflow-hidden`}>
                {contractData[0].name === 'Human' ? 'RetroPGF' : contractData[0].name}
              </span>
              {soldOut && <p className='uppercase text-red-500 text-xl pt-4'>sold out</p>}
            </div>
            
            <div className='flex-wrap gap-2 text-sm font-thin pr-8 sm:h-[30vh] h-[80vh] overflow-y-auto'>
              <div className='flex items-center justify-between'>
                <p>Mint start: {convertTimestamp(mintInfo?.startDate)}</p>
                <p>Mint end: {convertTimestamp(mintInfo?.endDate) || 'Open'}</p>
              </div>
              <p className='py-2'>Mint price: <span className='font-bold'>{mintInfo?.price!}</span></p>
              <div className='flex items-center justify-between'>
                <p>Max tokens: {mintInfo?.maxTokens || 'Open'}</p>
                <Link target="_blank" className='flex gap-2' href={`https://${blockscanner.url}/address/${contractData[0].primaryContract || ''}`}>{EtherscanScan(18, 20)} <span className='underline'> View on {blockscanner.name}</span></Link> 
              </div>
              <p className='mt-8 overflow-y-auto max-h-96'>{contractData[0].description}</p>
            </div>
            <div className='h-[20vh] absolute bottom-0 w-full'>
              {/* UPDATE TO REUSE THE MINT CONFIG */}
              <MintButton 
                account={account!}
                dstTokenAddress={zeroAddress} // TODO: could update for different token denominations
                mintConfig={{
                  sender: account!,
                  srcChainId: chain?.id as ChainId,
                  dstChainId: contractData[0].chainId as ChainId,
                  slippage: 1,
                  actionType: ActionType.NftPreferMint,
                  actionConfig: {
                    contractAddress: contractData[0].primaryContract,
                    chainId: contractData[0].chainId,
                    signature: mintInfo?.mintMethod,
                    args: mintInfo?.params,
                    cost: {
                      isNative: true,
                      amount: parseUnits(mintInfo?.price! || '0.00', 18),
                    },
                    supplyConfig: {
                      sellOutDate: mintInfo?.endDate,
                      maxCap: mintInfo?.maxTokens
                    },
                  }
                }}/>
                <div className="px-4 pt-4 relative">
                  <NumberTicker endDate={mintInfo?.endDate} maxTokens={mintInfo?.maxTokens} tokenCount={contractData[0].tokenCount} quantity={quantity} setQuantity={setQuantity} />
                  <div className='pt-6 pl-4'>
                    <a target='_blank' href={`https://checkout.decent.xyz/?app=nft&chain=${contractData[0].chainId}&address=${contractData[0].primaryContract}%3A0`}>
                      <p className='font-thin text-xs hover:opacity-80 hover:text-primary'>{'∟'} Buy with fiat</p>
                    </a>
                  </div>
                </div>
              </div>
          </div>

          <div className='md:w-1/2 w-full flex justify-center max-h-[500px] relative'>
            {VideoDict[contractData[0].symbol as keyof typeof VideoDict] ? 
              (contractData[0].symbol === "DECENT" ? 
              <div className='w-fit mx-8'><video src={VideoDict[contractData[0].symbol as keyof typeof VideoDict]} controls className='rounded-md' /></div> :
              <video src={VideoDict[contractData[0].symbol as keyof typeof VideoDict]} autoPlay loop muted className='rounded-md' />)
              : <Image src={contractData[0].symbol === 'SWAP+' ?  '/nfts/enjoy-nft.png' : contractData[0].image} height={500} width={500} alt="nft image" className='rounded-md' />
            }
          </div>
        </div>
        
        <div className='sm:inline-block sm:w-full sm:my-16 hidden md:hidden'></div>
        <MintFooter contractData={contractData} mintPrice={mintInfo?.price} />
      </div>
    </div>
  )
}

export default Mint;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { address, chainId } = context.query
  let nftData: any;

  if (address) {
    nftData = await getContractData([address], chainId)
  };

  return {
    props: {
      contractData: nftData || null,
      query: context.query,
    }
  }
};