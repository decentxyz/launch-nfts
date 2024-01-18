import { useEffect, useCallback } from "react";
import { useSearchContext } from "./contexts/SearchContext";

export function useRunSearch({
  nftData,
  sortedNfts,
  setSortedNfts
}: {
  nftData: any,
  sortedNfts: any;
  setSortedNfts: (match: any) => void;
}) {
  const { search } = useSearchContext();

  const debounce = <F extends (...args: any[]) => any>(func: F, delay: number): ((...args: Parameters<F>) => void) => {
    let debounceTimer: NodeJS.Timeout | null = null;
    return function(...args: Parameters<F>) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const searchNFTs = useCallback(debounce(() => {
    const trimmedSearch = search.trim().toLowerCase();
    if (trimmedSearch) {
      const match = nftData.filter((nft: any) => 
        nft.name.toLowerCase() === trimmedSearch || 
        nft.primaryContract.toLowerCase() === trimmedSearch
      );
      setSortedNfts(match);
    } else {
      setSortedNfts(nftData);
    }
  }, 300), [nftData, search]);

  useEffect(() => {
    searchNFTs();
  }, [search, searchNFTs]);

  return sortedNfts;
};