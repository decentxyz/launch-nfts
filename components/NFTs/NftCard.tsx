import Image from "next/image";
import styles from "./nfts.module.css";
import { useRef, useEffect } from "react";
import { BaseScan } from "../../lib/utils/logos";
import Link from "next/link";

const NftCard = (props: any) => {
  const { collection, screenWidth } = props;
  const blurRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(() => blurRef.current && (blurRef.current.style.display = "block"))
  }, []);


  return (
    <div className={`${styles.nftCard} ${styles.containerFlex} bg-black ${screenWidth > 768 ? "w-1/2" : screenWidth > 640 ? "w-3/4" : "w-full"} flex rounded-[6px] p-6 min-h-[400px]`}>
      <div>
        <Image className="rounded-md" src={collection.image} fill alt="nft image" />
      </div>
      <div ref={blurRef} className={`${styles.blurrer} rounded-[6px]`}></div>

      <div className="w-1/2 h-full z-10 mr-2 text-left max-h-[400px] space-y-3 relative overflow-y-auto">
        <Link href={`/mint/${collection.primaryContract}`}><p className="text-6xl hover:text-[#0052FF] cursor-pointer">{collection.name}</p></Link>
        <p className="font-medium text-xs">{collection.createdAt}</p>
        <p className="flex gap-2 items-center font-thin text-xs underline">{BaseScan(18, 20)}<Link target="_blank" href={`https://basescan.org/address/${collection.primaryContract}`}>View on BaseScan</Link></p>
        <p className="font-thin text-sm absolute bottom-0 left-0">put box here</p>
      </div>
      
      <div className="h-full sm:w-1/2 w-full relative h-full ml-2">
        <Link href={`/mint/${collection.primaryContract}`}>
          <Image className="rounded-md hover:opacity-80 cursor-pointer" src={collection.image} fill alt="nft image" />
        </Link>
      </div>
    </div>
  )
}

export default NftCard;