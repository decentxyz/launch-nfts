import useSWR from 'swr';
import axios from 'axios';
import absoluteUrl from '../utils/absoluteUrl';

export const useChainData = (date?: string) => {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, isLoading, error } = useSWR(`${absoluteUrl()?.origin}/api/getChainData?targetDate=${date}`, fetcher);

  console.log(data)

  return {
    chainData: data,
    loadingChainData: isLoading,
    errorChainData: error,
  };
};