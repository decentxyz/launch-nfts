import NftCard from "./NftCard";
import styles from "./nfts.module.css";
import { useRef, useEffect, useState } from 'react';
import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";
import { useSearchContext } from "../../lib/contexts/SearchContext";

const FeaturedNftContainer = ({ nftData }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardSize, setCardSize] = useState(0);
  const { setMiddleIndex } = useFeaturedNftContext();
  const { search } = useSearchContext();

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

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
          : screenWidth > 640
          ? container.offsetWidth * 0.75
          : container.offsetWidth;
      setCardSize(cardWidth);
    }

    const handleScroll = (e: WheelEvent) => {
      const container = containerRef.current;
      if (container) {
        container.scrollLeft += e.deltaY
        const middleCardIndex = Math.round(container.scrollLeft / cardSize);
        setMiddleIndex(middleCardIndex);
      };
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, [cardSize, screenWidth, setMiddleIndex]);

  const searchSort = (a:any, b:any) => {
    if (a.primaryContract.toLocaleLowerCase() === search.toLocaleLowerCase() || a.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
      return -1;
    } else if (b.primaryContract.toLocaleLowerCase() === search.toLocaleLowerCase() || b.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
      return 1;
    } else return 0;
  };

  const sortedNftData = nftData.sort(searchSort);

  return <>
    <div className={`${styles.featuredContainer}`} ref={containerRef}>
      <div className={`${styles.emptyItem}`} />
        {sortedNftData.map((collection: any, i:number) => {
          return <NftCard key={i} screenWidth={screenWidth} collection={collection} />
        })}
      <div className={`${styles.emptyItem}`} />
    </div>
  </>
}

export default FeaturedNftContainer;