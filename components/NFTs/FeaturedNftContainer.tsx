import NftCard from "./NftCard";
import styles from "./nfts.module.css";
import { useRef, useEffect, useState } from 'react';
import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";
import { useSearchContext } from "../../lib/contexts/SearchContext";

const FeaturedNftContainer = ({ nftData }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [cardSize, setCardSize] = useState(0);
  const { setMiddleIndex } = useFeaturedNftContext();
  const { search } = useSearchContext();

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const cardWidth =
        screenWidth > 768
          ? container.offsetWidth * 0.5
          : container.offsetWidth;
      setCardSize(cardWidth);
    }


    const handleScroll = (e: WheelEvent) => {
      const container = containerRef.current;
      if (container) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
        let newScrollLeft = container.scrollLeft + e.deltaY;
        
        if (newScrollLeft < 0) {
          newScrollLeft = 0;
        } else if (newScrollLeft > maxScrollLeft) {
          newScrollLeft = maxScrollLeft;
        }
        
        container.scrollLeft = newScrollLeft;
        
        const middleCardIndex = Math.round(newScrollLeft / cardSize);
        if (middleCardIndex < nftData.length) {
          setMiddleIndex(middleCardIndex);
        } else {
          setMiddleIndex(nftData.length - 1);
        }
      }
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, [cardSize, nftData.length, screenWidth, setMiddleIndex]);

  const searchSort = (a:any, b:any) => {
    if (a.primaryContract.toLocaleLowerCase() === search.toLocaleLowerCase() || a.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
      return -1;
    } else if (b.primaryContract.toLocaleLowerCase() === search.toLocaleLowerCase() || b.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
      return 1;
    } else return 0;
  };

  const sortedNftData = nftData.sort(searchSort);

  return <>
    <div className={`${styles.featuredContainer} relative overflow-x-scroll`} ref={containerRef}>
      <div className="absolute left-6 font-thin top-1/2 transform -translate-y-1/2 w-40">
        Mint NFTs on Base.<span className="text-[#0052FF]">With any token. No bridging required.</span>
      </div>
      <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`} />
        {sortedNftData.map((collection: any, i:number) => {
          return <NftCard key={i} index={i} screenWidth={screenWidth} collection={collection} cardView={false} />
        })}
      <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`} />
    </div>
  </>
}

export default FeaturedNftContainer;