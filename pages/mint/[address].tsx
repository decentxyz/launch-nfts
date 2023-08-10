import { NextPage } from 'next';
import { getSingleContractData } from '../../lib/nftData/getContractData';
import MintNavbar from '../../components/Navbars/MintNavbar';
import styles from "../../styles/Home.module.css";
import Image from 'next/image';
import MintFooter from '../../components/Footers/MintFooter';
import { getMintInfo } from "../../lib/utils/minting/trackedNfts";
import { useAccount } from "wagmi";
import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { parseUnits } from "viem";

const Mint: NextPage = (props: any) => {
  const { address, contractData } = props;
  const { address: account } = useAccount();
  const mintInfo = account && getMintInfo(contractData[0].primaryContract, account, 1);

  return (
    <>
    <MintNavbar address={address} all />
    <div className={`${styles.main} px-[24px] py-[12px] relative`}>
      <div className='flex md:flex-wrap flex-wrap-reverse md:gap-0 gap-12 md:mt-0 mt-40 w-full relative'>
        <div className='md:w-1/2 w-full h-full pr-8 relative'>
          <p className="font-thin text-7xl">{contractData[0].name}</p>
          <p className='pt-8'>Mint start: need to input from contract</p>
          <p className='pt-2'>Mint end: need to input from contract</p>
          <p className='mt-8'>{contractData[0].description}</p>
          <div>
          {mintInfo && 
            <TheBox
              className=""
              actionType={ActionType.NftPreferMint}
              actionConfig={{
                contractAddress: contractData[0].primaryContract,
                chainId: ChainId.BASE,
                signature: mintInfo.mintMethod,
                args: mintInfo.params,
                supplyConfig: {
                  maxCap: mintInfo.maxTokens,
                },
                cost: {
                  isNative: true,
                  amount: parseUnits(mintInfo.price, 18),
                },
              }}
              apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
            />
          }
          </div>
        </div>

        <div className='md:w-1/2 w-full relative flex justify-center'>
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
    nftData = await getSingleContractData(address)
  }

  return {
    props: {
      address,
      contractData: nftData || null
    }
  }
};