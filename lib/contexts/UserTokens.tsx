import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useUsersBalances } from "@decent.xyz/box-hooks";
import { ChainId, TokenInfo } from "@decent.xyz/box-common";
import { getUsdPrice } from "../tokenPrices";
import { useAccount } from "wagmi";

export interface FullTokens extends TokenInfo {
  usdValue: number;
  balanceFloat: number;
  balance: bigint;
}

export interface UserTokens {
  tokens: FullTokens[];
  totalUsdBalance: number;
  loadingPrice: boolean;
  priceError: boolean;
  loadingTokens: boolean;
  tokensError: boolean;
}

export const TokenContext = createContext<UserTokens>({
  tokens: [],
  totalUsdBalance: 0,
  loadingPrice: true,
  priceError: false,
  loadingTokens: true,
  tokensError: false,
});

export const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [priceError, setPriceError] = useState(false);
  const [fullTokens, setFullTokens] = useState<FullTokens[]>([]);
  const hasRunOnce = useRef(false);

  const { address } = useAccount();
  const { tokens: userTokens = [], isLoading, error } = useUsersBalances({
    address,
    chainId: ChainId.BASE,
    selectChains: [
      ChainId.ETHEREUM,
      ChainId.BASE,
      ChainId.ARBITRUM,
      ChainId.OPTIMISM,
      ChainId.ZORA,
    ],
  });

  const calculateUsdBal = useCallback(async () => {
    setLoadingPrice(true);
    setPriceError(false);
    console.log('tokens running...');

    try {
      const usdPrices = await Promise.all(
        userTokens.map(token =>
          getUsdPrice({
            chainId: token.chainId,
            tokenAddress: token.address,
          })
        )
      );

      let totalUsdBal = 0;
      const updatedTokens = userTokens.map((token, index) => {
        const usdValue =
          typeof token.balanceFloat === "number" &&
          typeof usdPrices[index] === "number"
            ? token.balanceFloat * usdPrices[index]
            : 0;
        totalUsdBal += usdValue;
        return {
          ...token,
          usdValue,
        };
      });

      setTotalUsdBalance(totalUsdBal);
      setFullTokens(updatedTokens);
    } catch (err) {
      setPriceError(true);
    } finally {
      setLoadingPrice(false);
    }
  }, [userTokens]);

  useEffect(() => {
    if (address && userTokens.length > 0 && !hasRunOnce.current) {
      hasRunOnce.current = true; // Mark the calculation as run
      calculateUsdBal();
    } else {
      setLoadingPrice(false);
    }
  }, [address, userTokens, calculateUsdBal]);

  const contextValue = useMemo(
    () => ({
      tokens: fullTokens,
      totalUsdBalance,
      loadingPrice,
      priceError,
      loadingTokens: isLoading,
      tokensError: !!error,
    }),
    [fullTokens, totalUsdBalance, loadingPrice, priceError, isLoading, error]
  );

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);