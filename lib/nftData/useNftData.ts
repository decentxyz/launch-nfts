import useSWR from 'swr';
import axios from 'axios';
import absoluteUrl from '../utils/absoluteUrl';

export const useNftData = (addresses: string[]) => {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, isLoading, error } = useSWR(`${absoluteUrl().origin}/api/getNftData?addresses=${addresses}`, fetcher);

  return {
    nftData: data,
    loadingNftData: isLoading,
    errorNftData: error,
  };
};