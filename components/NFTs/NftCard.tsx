import Image from "next/image";
import styles from "./nfts.module.css";

const NftCard = (props: any) => {
  const { collection, screenWidth } = props;
  
  return (
    <div className={`${styles.nftCard} bg-black ${screenWidth > 768 ? "w-1/2" : screenWidth > 640 ? "w-3/4" : "w-full"}`}>
      <div>
        test
      </div>
      <div>
        <Image className="rounded-md" src={collection.image} height={400} width={400} alt="nft image" />
      </div>
    </div>
  )
}

export default NftCard;