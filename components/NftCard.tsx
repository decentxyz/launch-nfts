import Image from "next/image";

const NftCard = (collection: any) => {
  return <>
    <div style={{ height: 400, width: 800 }} className="flex gap-4">
      <div>
        test
      </div>
      <div>
        <Image className="rounded-md" src={collection.image} height={400} width={400} alt="nft image" />
      </div>
    </div>
  </>
}

export default NftCard;