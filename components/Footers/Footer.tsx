import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";

const Footer = (props: any) => {
  const { nftData } = props;
  const { middleIndex } = useFeaturedNftContext();
  const activeNft = nftData[middleIndex];

  return <>
    <div className="hidden sm:inline-block absolute bottom-0 w-full h-24 py-[12px] px-[24px]">
      <div className="flex justify-between font-thin text-xs">
        <p className="w-1/5">Collection Name</p>
        <p className="w-1/5 text-center">Total Minted</p>
        <p className="w-1/5 text-center hidden sm:inline-block">% Unique Owners</p>
        <p className="w-1/5 text-center hidden sm:inline-block">% On Sale</p>
        <p className="w-1/5 text-right">Secondary Volume</p>
      </div>
      {nftData && 
        <div className="flex items-center justify-between pt-1">
          <p className="w-1/5 text-[#0052FF]">
            {activeNft?.name}
          </p>
          <p className="w-1/5 text-center text-[#0052FF]">
            {parseInt(activeNft?.tokenCount).toLocaleString()}
          </p>
          <p className="w-1/5 text-center text-[#0052FF] hidden sm:inline-block">
            {((activeNft?.ownerCount / parseInt(activeNft?.tokenCount))*100).toFixed(2)+ "%"}
          </p>
          <p className="w-1/5 text-center text-[#0052FF] hidden sm:inline-block">
            {((parseInt(activeNft?.onSaleCount) / parseInt(activeNft?.tokenCount))*100).toFixed(2)+ "%"}
          </p>
          <p className="w-1/5 text-right text-[#0052FF]">
            {activeNft?.volume?.allTime?.toFixed(2).toLocaleString()} ETH
          </p>
        </div>
      }
      <div className='absolute bottom-0 right-0'>🟦</div>
    </div>
  </>
}

export default Footer;