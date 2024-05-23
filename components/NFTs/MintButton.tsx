import "@decent.xyz/box-ui/index.css";
import { useState, useEffect, useCallback, useMemo, useReducer } from "react";
import Image from "next/image";

import {
  ChainId,
  ActionType,
  ActionConfig,
  Transaction,
  Payment,
  BridgeId,
  RelayInfo,
  EvmTransaction,
  TokenInfo,
  ethGasToken,
} from "@decent.xyz/box-common";
import { ClientRendered, ChainIcon } from "@decent.xyz/box-ui";
import { BoxHooksContextProvider } from "@decent.xyz/box-hooks";

import { Address, zeroAddress, formatUnits } from "viem";
import { useAccount } from "wagmi";
import { sendTransaction, switchChain, getBalance } from "@wagmi/core";
import { toast } from "react-toastify";

import DropDownIcon from "../DropdownIcon";
import LoadingSpinner from "../Spinner";
import { BalanceSelector } from "../BalanceSelector";
import {
  approveTokenHandler,
  checkForApproval,
} from "../../lib/mint/tokenApproval";
import { wagmiConfig } from "../../lib/wagmiConfig";
import { useTokenContext } from "../../lib/contexts/UserTokens";
import { generateResponse } from "../../lib/mint/getTx";

interface BoxActionRequest {
  sender: Address;
  srcChainId: ChainId;
  srcToken?: Address;
  dstChainId: ChainId;
  dstToken?: Address;
  slippage: number;
  actionType: ActionType;
  actionConfig: ActionConfig;
}

type BoxActionResponse = {
  tx: Transaction;
  tokenPayment?: Payment;
  applicationFee?: Payment;
  bridgeFee?: Payment;
  bridgeId?: BridgeId;
  relayInfo?: RelayInfo;
};

enum MintState {
  IDLE,
  LOADING,
  NEEDS_APPROVAL,
  READY_TO_MINT,
  INSUFFICIENT_BALANCE,
  MINTING,
  MINTED,
}

type MintAction =
  | { type: "SET_CONFIG"; payload: BoxActionRequest }
  | { type: "SET_ACTIVE_TX"; payload: BoxActionResponse }
  | { type: "SET_APPROVAL"; payload: boolean }
  | { type: "SET_BALANCE"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "MINT" }
  | { type: "APPROVE" }
  | { type: "SET_TX_HASH"; payload: string };

interface MintStateType {
  state: MintState;
  config?: BoxActionRequest;
  activeTx?: BoxActionResponse;
  needsApproval: boolean;
  sufficientBalance: boolean;
  loading: boolean;
  txHash?: string;
}

const initialState: MintStateType = {
  state: MintState.IDLE,
  needsApproval: false,
  sufficientBalance: true,
  loading: false,
};

const BaseEth: TokenInfo = {
  ...ethGasToken,
  chainId: ChainId.BASE
}

function mintReducer(state: MintStateType, action: MintAction): MintStateType {
  switch (action.type) {
    case "SET_CONFIG":
      return { ...state, config: action.payload, state: MintState.LOADING };
    case "SET_ACTIVE_TX":
      return {
        ...state,
        activeTx: action.payload,
        state: action.payload ? MintState.READY_TO_MINT : state.state,
      };
    case "SET_APPROVAL":
      return {
        ...state,
        needsApproval: action.payload,
        state: state.sufficientBalance && action.payload ? MintState.NEEDS_APPROVAL : state.state,
      };
    case "SET_BALANCE":
      return {
        ...state,
        sufficientBalance: action.payload,
        state: !action.payload ? MintState.INSUFFICIENT_BALANCE : state.needsApproval ? MintState.NEEDS_APPROVAL : state.state,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload, state: action.payload ? MintState.LOADING : state.state };
    case "MINT":
      return { ...state, state: MintState.MINTING };
    case "APPROVE":
      return { ...state, state: MintState.NEEDS_APPROVAL };
    case "SET_TX_HASH":
      return { ...state, txHash: action.payload, state: MintState.MINTED };
    default:
      return state;
  }
}

export default function MintButton({
  mintConfig,
  account,
  dstTokenAddress,
}: {
  mintConfig: BoxActionRequest;
  account: Address;
  dstTokenAddress: Address;
}) {
  const { chain } = useAccount();
  const tokenBalances = useTokenContext();
  const [state, dispatch] = useReducer(mintReducer, initialState);

  const [showBalanceSelector, setShowBalanceSelector] = useState(false);
  const [srcToken, setSrcToken] = useState<TokenInfo | any>(BaseEth);

  useEffect(() => {
    dispatch({
      type: "SET_CONFIG",
      payload: {
        ...mintConfig,
        srcToken: srcToken.address as Address,
        srcChainId: srcToken.chainId,
        dstToken: dstTokenAddress,
      },
    });
  }, [dstTokenAddress, mintConfig, srcToken]);

  useEffect(() => {
    const init = async () => {
      if (account && state.config) {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          const { response } = await generateResponse({ txConfig: state.config, account });
          if (response?.tx) {
            dispatch({ type: "SET_ACTIVE_TX", payload: response });
            const needsApproval = await checkForApproval({
              boxActionResponse: response,
              user: account,
              srcChainId: state.config.srcChainId,
            });
            console.log("Requires token approval...");
            dispatch({ type: "SET_APPROVAL", payload: needsApproval });
          }
        } catch (e) {
          console.log("Error getting tx response", e);
          dispatch({ type: "SET_ACTIVE_TX", payload: undefined });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    init();
  }, [account, state.config]);

  useEffect(() => {
    const loadBalance = async () => {
      if (account && chain && state.activeTx) {
        const balance = await getBalance(wagmiConfig, {
          address: account,
          chainId: srcToken.chainId,
          unit: "ether",
        });
        const formattedEthBalance = formatUnits(balance.value, balance.decimals);
        const requiredAmount = formatUnits(state.activeTx.tokenPayment.amount, state.activeTx.tokenPayment.decimals);

        const sufficient =
          srcToken.address === zeroAddress
            ? Number(formattedEthBalance) > Number(requiredAmount)
            : Number(formatUnits(srcToken.balance, srcToken.decimals)) > Number(requiredAmount) && Number(formattedEthBalance) > 0.0004;
        dispatch({ type: "SET_BALANCE", payload: sufficient });
      }
    };

    loadBalance();
  }, [account, chain, srcToken, state.activeTx]);

  const runApproval = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      if (state.config && chain?.id !== srcToken.chainId) {
        await switchChain(wagmiConfig, { chainId: srcToken.chainId });
      }
      if (state.activeTx && state.activeTx.tokenPayment) {
        const hash = await approveTokenHandler({
          boxActionResponse: state.activeTx,
          userAddress: account!,
          srcChainId: srcToken.chainId,
        });
        dispatch({ type: "SET_APPROVAL", payload: false });
        console.log("Approved tx hash: ", hash);
      }
    } catch (e) {
      console.error("Error approving token", e);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.config, chain?.id, srcToken.chainId, state.activeTx, account]);

  const runTx = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      if (state.config && chain?.id !== state.config.srcChainId) {
        await switchChain(wagmiConfig, { chainId: state.config.srcChainId });
      }
      if (state.config && chain?.id === state.config.srcChainId) {
        if (state.activeTx) {
          const hash = await sendTransaction(wagmiConfig, state.activeTx.tx as EvmTransaction);
          dispatch({ type: "SET_TX_HASH", payload: hash });
          toast.success(
            <>
              Minted!
              <a
                className="underline hover:opacity-80"
                target="_blank"
                href={`https://www.decentscan.xyz/?chainId=${state.config.srcChainId}&txHash=${hash}`}
              >
                View transaction status.
              </a>
            </>
          );
        }
      }
    } catch (e) {
      console.error("Error executing transaction", e);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.config, chain?.id, state.activeTx]);

  const handleApproval = useCallback(() => {
    runApproval();
  }, [runApproval]);

  const handleRunTx = useCallback(() => {
    runTx();
  }, [runTx]);

  const isButtonDisabled = useMemo(
    () => state.loading || !state.sufficientBalance || !state.activeTx,
    [state.loading, state.sufficientBalance, state.activeTx]
  );

  const buttonLabel = useMemo(() => {
    if (state.loading) return <LoadingSpinner />;
    if (state.state === MintState.INSUFFICIENT_BALANCE) return "Insufficient Balance";
    if (state.state === MintState.NEEDS_APPROVAL) return "Approve Token";
    return "Mint";  
  }, [state.loading, state.state]);

  return (
    <ClientRendered>
      <BoxHooksContextProvider apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}>
        <div className="flex items-center gap-4 relative">
          <button
            disabled={isButtonDisabled}
            onClick={state.needsApproval ? handleApproval : handleRunTx}
            className={`${isButtonDisabled ? "bg-gray-200 text-black" : "bg-black text-white hover:opacity-80"} w-full py-2 rounded-full`}
          >
            {buttonLabel}
          </button>
          <div className="relative flex items-center gap-4 z-50">
            <div
              onClick={() => setShowBalanceSelector(!showBalanceSelector)}
              className="rounded-full border border-black py-1 px-2 bg-white flex items-center hover:opacity-80 cursor-pointer"
            >
              <div className="box-relative box-w-[24px] box-h-[24px] box-mr-[8px] box-flex box-items-center">
                <Image src={srcToken.logo!} width={20} height={20} alt="token-logo" />
                <ChainIcon chainId={srcToken.chainId} className="box-absolute box-right-0 box-bottom-0" />
              </div>
              <DropDownIcon />
            </div>
            {showBalanceSelector && tokenBalances && (
              <div className="absolute bottom-full right-0 bg-white">
                <BalanceSelector
                  className="bg-white text-sm font-sans drop-shadow-lg max-h-96 overflow-y-scroll mb-2 text-black"
                  setSelectedToken={(tokeninfo: TokenInfo) => {
                    setSrcToken(tokeninfo);
                    setShowBalanceSelector(false);
                  }}
                  tokenContext={tokenBalances}
                />
              </div>
            )}
          </div>
        </div>
      </BoxHooksContextProvider>
    </ClientRendered>
  );
}