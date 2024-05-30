import MintBox from "./MintBox";
import { trackedNfts } from "../../lib/nftData/trackedNfts";
import Image from "next/image";
import Link from "next/link";
import StandardFooter from "../Footers/StandardFooter";

const MintPreview = ({ collection }: { collection: any }) => {
  const activeNft = trackedNfts.filter(nft => nft.address.toLowerCase() === collection.primaryContract.toLowerCase());

  return <>
    <div className="flex gap-2 items-center text-xs uppercase">
      {activeNft[0].address.toLowerCase() === trackedNfts[0].address.toLowerCase() && <div className="flex items-center gap-2">
        <div className="border border-white rounded-lg py-1 px-3">
          Minting Now
        </div>
        {/* <a target="_blank" href="https://warpcast.com/jordanlyall/0x1e9b3117" className="border border-white rounded-lg py-1 px-3">
          🖼️ mint in frame
        </a> */}
      </div>
      }
      <div>Edition</div>  
    </div>

    <div className="py-2 space-y-2">
      <div className="text-3xl">{collection.name}</div>
      <div className="text-2xl text-gray-400">by {activeNft[0].artist}</div>
    </div>

    <MintBox collection={collection} />

    <div className="py-4">
      {collection.description}
    </div>

    <StandardFooter />
  </>
}

export default MintPreview;