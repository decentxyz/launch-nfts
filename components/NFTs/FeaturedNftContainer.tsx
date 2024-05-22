import NftCard from "./NftCard";
import styles from '../../styles/nfts.module.css';
import { useState } from 'react';
import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";
import { useSearchContext } from "../../lib/contexts/SearchContext";
import { useRunSearch } from "../../lib/runSearch";
import { trackedNfts } from "../../lib/nftData/trackedNfts";
import CountdownText from "../CountdownText";
import Link from "next/link";
import { getEndOfDayDate } from "../../lib/useCountdown";

const FeaturedNftContainer = ({ nftData }: any) => {
  const { middleIndex, setMiddleIndex } = useFeaturedNftContext();
  const { search } = useSearchContext();
  const [sortedNftData, setSortedNftData] = useState(nftData);

  const activeNft = trackedNfts.filter(nft => nft.address.toLowerCase() === sortedNftData[middleIndex]?.primaryContract.toLowerCase());
  const nftDate = new Date(activeNft[0].endDate * 1000);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = nftDate.toLocaleDateString('en-US', options);

  function handleNext() {
    setMiddleIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      const resetIndex = nextIndex >= nftData.length ? 0 : nextIndex;
      setTimeout(() => {
        document.getElementById("nft-" + resetIndex)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return resetIndex;
    });
  }

  function handlePrev() {
    setMiddleIndex(prevIndex => {
      const nextIndex = prevIndex - 1;
      const resetIndex = nextIndex < 0 ? nftData.length - 1 : nextIndex;
      setTimeout(() => {
        document.getElementById("nft-" + resetIndex)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return resetIndex;
    });
  }

  useRunSearch({
    nftData,
    sortedNfts: sortedNftData,
    setSortedNfts: setSortedNftData
  });

  return (
    <>
      <div className='flex w-full'>
        <div className='w-full flex justify-between font-thin text-xs'>
          {middleIndex === 0 ? 
            <CountdownText dropTime={getEndOfDayDate()} /> :
            <div></div>
          }
          <Link href="/all" className='text-right hover:text-primary pb-2'>View All {'→'}</Link>
        </div>
      </div>
      <div className={`${styles.featuredContainer} relative overflow-x-scroll`}>
        <div
          className={`${styles.emptyItem} md:w-1/4 sm:w-1/2 w-fit md:inline-block px-4 text-xs font-thin flex items-center justify-center`}
          style={{ height: '200px' }} // Adjust height as needed
        >
        <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`} />
        </div>
        {sortedNftData.map((collection: any, i: number) => {
          return (
            <NftCard key={i} index={i} collection={collection} cardView={false} />
          );
        })}
        <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`} />
      </div>
      <div className="flex justify-between w-full pt-4">
        <button
          className="border border-white px-5 py-[2px] rounded-md"
          onClick={handlePrev}
        >
          ⬅
        </button>
        <div className="text-lg font-thin">
          {formattedDate}
        </div>
        <button
          className="border border-white px-5 py-[2px] rounded-md"
          onClick={handleNext}
        >
          ⮕
        </button>
      </div>
    </>
  );  
}

export default FeaturedNftContainer;