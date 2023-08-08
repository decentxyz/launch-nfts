import Image from "next/image";
import styles from "./nfts.module.css";
import { useRef, useEffect } from "react";

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

      <div className="w-1/2 h-full z-10 mr-2 text-left">
        <div className="max-h-[400px] overflow-auto space-y-3">
          <p className="text-6xl">{collection.name}</p>
          <p className="font-medium text-xs">{collection.createdAt}</p>
          <p className="font-thin text-sm">{collection.description || "Stealthy NFT with no description provided."}</p>
        </div>
      </div>
      <div className="h-full sm:w-1/2 w-full relative h-full ml-2">
        <Image className="rounded-md" src={collection.image} fill alt="nft image" />
      </div>
    </div>
  )
}

export default NftCard;