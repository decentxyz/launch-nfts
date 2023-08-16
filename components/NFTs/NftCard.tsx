import Image from "next/image";
import styles from "./nfts.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { getMintInfo } from "../../lib/utils/minting/trackedNfts";
import { useAccount } from "wagmi";
import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { parseUnits } from "viem";
import Modal from "../Modal";
import NumberTicker from "../NumberTicker";
import { BaseScan } from "../../lib/utils/logos";

const NftCard = (props: any) => {
  const { collection, screenWidth, cardView } = props;
  const blurRef = useRef<HTMLDivElement | null>(null);
  const { address: account } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const mintInfo = account && getMintInfo(collection.primaryContract, quantity, account);

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(() => blurRef.current && (blurRef.current.style.display = "block"))
  }, []);

  return <>
    <Modal className="relative max-w-[500px] bg-white rounded-md" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="pb-2 font-thin text-2xl">Purchase {collection.name} NFTs</div>
      <TheBox
        className="border border-black rounded-md my-2"
        paymentButtonText={`Purchase ${quantity}`}
        actionType={ActionType.NftPreferMint}
        actionConfig={{
          contractAddress: collection.primaryContract,
          chainId: ChainId.BASE,
          signature: mintInfo?.mintMethod,
          args: mintInfo?.params,
          supplyConfig: {
            sellOutDate: mintInfo?.endDate
          },
          cost: {
            isNative: true,
            amount: parseUnits(mintInfo?.price || '0', 18),
          },
        }}
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      />
      <div className="px-4">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} />
      </div>
    </Modal>

    <div className={`${styles.nftCard} ${screenWidth < 768 || cardView ? "w-full" : cardView ? 'w-1/2' : "xl:w-1/2 lg:w-3/5"}`}>
      <div className={`${styles.containerFlex} rounded-[6px]`}>
        <div>
          <Image className="rounded-md" src={collection?.image || ''} fill alt="nft image" />
        </div>
        <div ref={blurRef} className={`${styles.blurrer} rounded-[6px]`}></div>

        <div className="sm:flex p-6 justify-center items-center">
          {!cardView && 
          <div className={`w-full h-[400px] flex z-10 mr-2 text-left space-y-3 relative overflow-x-hidden hidden sm:inline-block`}>
            <Link href={`/mint/${collection?.primaryContract}`}>
              <p className="text-6xl hover:text-[#0052FF] cursor-pointer">{collection?.name}</p>
            </Link>
            <div>
            <p className="font-medium text-xs xl:inline-block hidden pt-2">{collection?.createdAt}</p>
            <div className="xl:inline-block w-full hidden">
              <Link target="_blank" className='flex gap-2 text-xs pt-2' href={`https://basescan.org/address/${collection.primaryContract || ''}`}>{BaseScan(18, 20)} <span className='underline'> View on Basescan</span></Link>
            </div> 
            <div className="absolute bottom-2 left-0">
              <button className="text-xl px-16 py-2 bg-white bg-opacity-60 drop-shadow-md rounded-full hover:opacity-80" onClick={() => setIsOpen(true)}>Mint</button>
            </div>
          </div>
          </div>
          }
          
          <div className={`${cardView ? "w-[310px] md:max-w-[380px]" : "w-full max-h-[400px] md:max-w-[400px]"} relative aspect-square `}>
            <Link href={`/mint/${collection?.primaryContract}`}>
              <Image className="rounded-md hover:opacity-80 cursor-pointer" src={collection?.image || ''} fill alt="nft image" />
            </Link>
          </div>
        </div>
      </div>

      <div className={`${!cardView && 'sm:hidden'} w-full flex justify-start pt-4`}>
        <Link href={`/mint/${collection?.primaryContract || ''}`}>
          <p className='text-right font-thin text-xs hover:opacity-80'>{'∟'} Click to mint <span className="font-thin font-medium">{collection?.name}</span></p>
        </Link>
      </div>
    </div>
  </>
}

export default NftCard;