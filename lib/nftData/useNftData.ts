import useSWR from 'swr';
import axios from 'axios';
import absoluteUrl from '../utils/absoluteUrl';

export const useNftData = (addresses: string[]) => {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const apiUrl = `${absoluteUrl().origin}/api/getNftData?addresses=${addresses}`;
  
  const { data: nftData, error: errorNftData } = useSWR(apiUrl, fetcher);

  return {
    nftData,
    loadingNftData: !nftData && !errorNftData,
    errorNftData,
  };
};