import NftCard from "./NftCard";
import styles from '../../styles/nfts.module.css';
import { useState, useEffect } from 'react';
import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";
// import { useSearchContext } from "../../lib/contexts/SearchContext";
import { useRunSearch } from "../../lib/runSearch";
import { trackedNfts } from "../../lib/nftData/trackedNfts";
import Link from "next/link";
import MintBox from "./MintBox";
import Modal from "../Modal";

const FeaturedNftContainer = ({ nftData }: any) => {
  const { middleIndex, setMiddleIndex } = useFeaturedNftContext();
  const [isOpen, setIsOpen] = useState(false);
  // const { search } = useSearchContext();
  const [sortedNftData, setSortedNftData] = useState(nftData);

  const activeNft = trackedNfts.filter(nft => nft.address.toLowerCase() === nftData[middleIndex]?.primaryContract.toLowerCase());
  const nftDate = new Date(activeNft[0].startDate * 1000);
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
      <Modal
        className={`relative sm:min-w-[500px] max-w-[500px] rounded-lg bg-[#13110F] text-white`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="pb-2 font-thin text-xl">Purchase {sortedNftData[middleIndex].name}</div>
        <div className="w-full py-2">
          <MintBox collection={sortedNftData[middleIndex]} />
        </div>
      </Modal>

      <div className='flex w-full'>
        <div className='w-full flex justify-end font-thin text-xs'>
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
              <NftCard key={i} index={i} collection={collection} art={trackedNfts[i].art} />
            );
          })}
        <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`} />
      </div>
      <div className="flex justify-between w-full pt-4 max-w-[760px]">
        <button
          className="border border-white px-5 py-[2px] rounded-md rotate-180 h-8"
          onClick={handlePrev}
        >
          ⮕
        </button>
        <div className="text-lg font-thin text-center">
          {formattedDate}
          <div className="font-medium hidden sm:flex">
            <div>
              <Link href={`/mint/${sortedNftData[middleIndex].chainId}/${sortedNftData[middleIndex].primaryContract}`}>
                <div className="hover:text-primary">{sortedNftData[middleIndex].name}</div>
              </Link>
              <div className="text-base text-gray-400 font-light">by {activeNft[0].artist}</div>
              <button className="bg-white rounded-lg py-1 mt-4 px-20 text-black" onClick={() => setIsOpen(true)}>Mint</button>
            </div>
          </div>
        </div>
        <button
          className="border border-white px-5 py-[2px] rounded-md h-8"
          onClick={handleNext}
        >
          ⮕
        </button>
      </div>
    </>
  );  
}

export default FeaturedNftContainer;