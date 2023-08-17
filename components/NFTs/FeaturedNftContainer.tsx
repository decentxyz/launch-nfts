import NftCard from "./NftCard";
import styles from "./nfts.module.css";
import { useEffect, useRef, useState } from 'react';
import { useFeaturedNftContext } from "../../lib/contexts/FeaturedNftContext";
import { useSearchContext } from "../../lib/contexts/SearchContext";
import { throttle } from "../../lib/utils/throttle";

const FeaturedNftContainer = ({ nftData }: any) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const { setMiddleIndex } = useFeaturedNftContext();
  const { search } = useSearchContext();

  const outerRef = useRef<HTMLDivElement>(null);

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

  const searchSort = (a: any, b: any) => {
    if (a.primaryContract.toLocaleLowerCase() === search.toLocaleLowerCase() || a.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
      return -1;
    } else if (b.primaryContract.toLocaleLowerCase() === search.toLocaleLowerCase() || b.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
      return 1;
    } else return 0;
  };

  const [sortedNftData, setSortedNftData] = useState([]);
  useEffect(() => {
    setSortedNftData(nftData.sort(searchSort));
  }, [nftData])

  useEffect(() => {
    if (!sortedNftData || sortedNftData.length === 0) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 1) {
          const idx = entry.target.getAttribute('data-idx') ?? '0';
          setMiddleIndex(parseInt(idx));
          console.log(idx);
        }
      });
    }, {
      rootMargin: '0% 0% 0% 0%',
      threshold: [0, 1]
    });

    sortedNftData.forEach((_, i) => {
      const el = document.getElementById("nft-" + i);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sortedNftData]);

  useEffect(() => {
    if (!outerRef?.current) return;
    const scrollHandler = (e: WheelEvent) => {
      setMiddleIndex(oldMiddle => {
        const newMiddle = oldMiddle + Math.sign(e.deltaY);
        if (newMiddle >= sortedNftData.length || newMiddle < 0) return oldMiddle
        document.getElementById("nft-" + newMiddle)?.scrollIntoView({ behavior: "smooth" });
        return newMiddle;
      })
    }
    const throttledHandler = throttle(scrollHandler, 500)

    document.body.addEventListener("wheel", throttledHandler);
    return () => document.body.removeEventListener("wheel", throttledHandler);
  }, [outerRef.current])

  return <div className={`${styles.featuredContainer} relative overflow-x-scroll`} ref={outerRef}>
    <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`}>
      <div className="absolute left-6 font-thin top-1/2 transform -translate-y-1/2 w-40">
        Mint NFTs on Base.{' '}
        <span className="text-[#0052FF]">With any token. No bridging required.</span>
      </div>
    </div>
    {sortedNftData.map((collection: any, i: number) => {
      return <NftCard
        key={i}
        index={i}
        screenWidth={screenWidth}
        collection={collection}
        cardView={false}
      />
    })}
    <div className={`${styles.emptyItem} md:w-1/4 w-1/2 hidden md:inline-block`} />
  </div>
}

export default FeaturedNftContainer;