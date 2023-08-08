import NftCard from "./NftCard";
import styles from "./nfts.module.css";
import { useRef, useEffect, useState } from 'react';

const FeaturedNftContainer = ({ nftData }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [middleCardIndex, setMiddleCardIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardSize, setCardSize] = useState(0);

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
        const middleIndex = Math.round(container.scrollLeft / cardSize);
        setMiddleCardIndex(middleIndex);
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
  }, [cardSize, screenWidth]);

  return <>
  
    <div className={`${styles.featuredContainer}`} ref={containerRef}>
      <div className={`${styles.emptyItem}`} />
        {nftData.map((collection: any, i:number) => {
          return <NftCard key={i} screenWidth={screenWidth} collection={collection} />
        })}
    </div>
    {middleCardIndex}
  </>
}

export default FeaturedNftContainer;