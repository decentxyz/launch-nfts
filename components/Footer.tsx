import { useFeaturedNftContext } from "../lib/contexts/FeaturedNftContext";

const Footer = (props: any) => {
  const { nftData, isLoading, error } = props;

  const { middleIndex } = useFeaturedNftContext();

  return <>
    <div className="absolute bottom-0 w-full h-24 py-[12px] px-[24px]">
      <div className="flex justify-between font-thin text-xs">
        <p className="w-1/5">Collection Name</p>
        <p className="w-1/5 text-center">Total Minted</p>
        <p className="w-1/5 text-center">% Unique Owners</p>
        <p className="w-1/5 text-center">% On Sale</p>
        <p className="w-1/5 text-right">Secondary Volume</p>
      </div>
      {!isLoading && !error && 
        <div className="flex items-center justify-between pt-1">
          <p className="w-1/5 text-[#0052FF]">
            {nftData[middleIndex].name}
          </p>
          <p className="w-1/5 text-center text-[#0052FF]">
            {parseInt(nftData[middleIndex].tokenCount).toLocaleString()}
          </p>
          <p className="w-1/5 text-center text-[#0052FF]">
            {((nftData[middleIndex].ownerCount / parseInt(nftData[middleIndex].tokenCount))*100).toFixed(2)+"%"}
          </p>
          <p className="w-1/5 text-center text-[#0052FF]">
            {((parseInt(nftData[middleIndex].onSaleCount) / parseInt(nftData[middleIndex].tokenCount))*100).toFixed(2)+"%"}
          </p>
          <p className="w-1/5 text-right text-[#0052FF]">
            {nftData[middleIndex].volume.allTime.toFixed(2).toLocaleString()} ETH
          </p>
        </div>
      }
    </div>
  </>
}

export default Footer;