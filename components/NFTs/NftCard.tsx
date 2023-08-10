import Image from "next/image";
import styles from "./nfts.module.css";
import { useRef, useEffect } from "react";
import { BaseScan } from "../../lib/utils/logos";
import Link from "next/link";
import { getMintInfo } from "../../lib/utils/minting/trackedNfts";
import { useAccount } from "wagmi";
import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { parseUnits } from "viem";

const NftCard = (props: any) => {
  const { collection, screenWidth, cardView } = props;
  const blurRef = useRef<HTMLDivElement | null>(null);
  const { address: account } = useAccount();

  const mintInfo = account && getMintInfo(collection.primaryContract, account, 1);

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(() => blurRef.current && (blurRef.current.style.display = "block"))
  }, []);

  return (
    <div className={`${styles.nftCard} ${screenWidth < 768 || cardView ? "w-full" : "w-1/2"}`}>
      <div className={`${styles.containerFlex} rounded-[6px]`}>
        <div>
          <Image className="rounded-md" src={collection?.image || ''} fill alt="nft image" />
        </div>
        <div ref={blurRef} className={`${styles.blurrer} rounded-[6px]`}></div>

        <div className="sm:flex p-6">
          {!cardView && 
          <div className="w-1/2 max-h-[380px] z-10 mr-2 text-left space-y-3 relative overflow-y-auto hidden sm:inline-block">
            <Link href={`/mint/${collection?.primaryContract}`}>
              <p className="text-6xl hover:text-[#0052FF] cursor-pointer">{collection?.name}</p>
            </Link>
            <p className="font-medium text-xs">{collection?.createdAt}</p>
            <p className="flex gap-2 items-center font-thin text-xs underline">{BaseScan(18, 20)}<Link target="_blank" href={`https://basescan.org/address/${collection?.primaryContract || ''}`}>View on BaseScan</Link></p>
            {mintInfo && 
              <TheBox
                className="text-xs"
                actionType={ActionType.NftPreferMint}
                actionConfig={{
                  contractAddress: collection.primaryContract,
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
          }
          
          <div className={`${cardView ? "w-[310px] md:w-[380px]" : "sm:w-1/2 w-full max-h-[380px]"} relative aspect-square sm:ml-2`}>
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
  )
}

export default NftCard;