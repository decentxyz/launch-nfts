import MintBox from "./MintBox";
import { trackedNfts } from "../../lib/nftData/trackedNfts";
import Image from "next/image";

const MintPreview = ({ collection }: { collection: any }) => {
  const activeNft = trackedNfts.filter(nft => nft.address.toLowerCase() === collection.primaryContract.toLowerCase());

  return <>
    <div className="flex gap-2 items-center text-xs uppercase">
      <div className="border border-white rounded-lg py-1 px-3">
        
        <div>Minting Now</div>
      </div>
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

    <div className="mt-4">
      <hr></hr>
      <div className="pt-8">
        <Image src='/prohibition-full.png' height={60} width={180} alt='logo' />
      </div>
    </div>
  </>
}

export default MintPreview;