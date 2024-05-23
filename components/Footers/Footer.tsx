import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";

const Footer = (props: any) => {
  const { nftData } = props;
  const { middleIndex } = useFeaturedNftContext();
  const activeNft = nftData[middleIndex];

  return <>
    <div className="hidden sm:inline-block absolute bottom-0 w-full h-24 py-[12px] px-[24px]">
      <div className="flex justify-between font-thin text-xs">
        {/* <p className="w-1/5">Collection Name</p> */}
        <p className="w-1/4">Total Minted</p>
        <p className="w-1/4 hidden sm:inline-block">% Unique Owners</p>
        <p className="w-1/4 text-right hidden sm:inline-block">% On Sale</p>
        <p className="w-1/4 text-right">Secondary Volume</p>
      </div>
      {nftData && 
        <div className="flex justify-between pt-1">
          {/* <p className="w-1/5">
            {activeNft?.name}
          </p> */}
          <p className="w-1/4">
            {parseInt(activeNft?.tokenCount).toLocaleString()}
          </p>
          <p className="w-1/4 hidden sm:inline-block">
            {(((activeNft?.ownerCount - 1) / parseInt(activeNft?.tokenCount))*100).toFixed(2)+ "%"}
          </p>
          <p className="w-1/4 text-right hidden sm:inline-block">
            {((parseInt(activeNft?.onSaleCount) / parseInt(activeNft?.tokenCount))*100).toFixed(2)+ "%"}
          </p>
          <p className="w-1/4 text-right">
            {activeNft?.volume?.allTime?.toFixed(2).toLocaleString()} ETH
          </p>
        </div>
      }
    </div>
  </>
}

export default Footer;