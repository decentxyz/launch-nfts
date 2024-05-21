import { Address, zeroAddress } from 'viem';
import {
  ChainId,
  ActionType,
  ActionConfig,
  Transaction,
  Payment,
  BridgeId,
  RelayInfo,
  EvmTransaction,
  bigintSerializer,
  bigintDeserializer,
  TokenInfo,
  ethGasToken
} from '@decent.xyz/box-common';
import { 
  ClientRendered,
  ChainIcon,
} from '@decent.xyz/box-ui';
import { BalanceSelector } from './BalanceSelector';
import '@decent.xyz/box-ui/index.css';
import { BoxHooksContextProvider } from '@decent.xyz/box-hooks';
import { useAccount } from 'wagmi';
import { sendTransaction, switchChain, getBalance } from '@wagmi/core';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import DropDownIcon from './DropdownIcon';
import { formatUnits } from 'viem';
import LoadingSpinner from './Spinner';
// import { getBlockscanner } from '../lib/utils/blockscanners';
import { checkForApproval, approveToken } from '../lib/checkForApproval';
import { wagmiConfig } from '../lib/wagmiConfig';
import { useTokenContext } from '../lib/contexts/UserTokens';

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

const BASE_URL = 'https://box-v2.api.decent.xyz/api/getBoxAction';

enum ChainNames {
  'Ethereum' = 1,
  'Optimism' = 10,
  'Arbitrum' = 42161,
  'Polygon' = 137,
  'Base' = 8453
}

export default function MintButton({ mintConfig, account, dstTokenAddress }: { mintConfig: BoxActionRequest, account: Address, dstTokenAddress: Address }) {
  const [showBalanceSelector, setShowBalanceSelector] = useState(false);
  const [requireApproval, setRequireApproal] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const [sufficientBalance, setSufficientBalance] = useState(true);
  const [txHash, setTxHash] = useState('');
  const { chain } = useAccount();
  const tokenBalances = useTokenContext();

  const [srcToken, setSrcToken] = useState<TokenInfo | any>(ethGasToken);
  const [txConfig, setTxConfig] = useState<BoxActionRequest>();
  const [activeTx, setActiveTx] = useState<BoxActionResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTxConfig({
      ...mintConfig,
      srcToken: srcToken.address as Address,
      srcChainId: srcToken.chainId,
      dstToken: dstTokenAddress,
    });
  }, [dstTokenAddress, mintConfig, srcToken])

  useEffect(() => {
    const init = async () => {
      if (account && txConfig) {
        setLoading(true);
        try {
          const { response, config } = await generateResponse({ txConfig, account });
          if (response?.tx) {
            setActiveTx(response);
            const needApproval = await checkForApproval({
              userAddress: account,
              actionResponse: response,
              srcChainId: srcToken.chainId
            });
            if (needApproval) {
              setRequireApproal(true);
            } else {
              setRequireApproal(false);
            }
          }
        } catch (e) {
          console.log("Error getting tx response", e);
          setActiveTx(undefined);
          setRequireApproal(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);;
      }
    };
  
    init();
  }, [account, txConfig, srcToken.chainId]);

  useEffect(() => {
    async function loadBalance(){
      if (account && chain) {
        const balance = await getBalance(wagmiConfig, {
          address: account,
          chainId: srcToken.chainId,
          unit: 'ether'
        })
        setEthBalance(balance.formatted);
        if (srcToken.address === zeroAddress) {
          setSufficientBalance(ethBalance > formatUnits(mintConfig.actionConfig.cost?.amount!, 18));
        } else if (srcToken && srcToken.balance) {
          setSufficientBalance(formatUnits(srcToken?.balance, srcToken.decimals) > formatUnits(mintConfig.actionConfig.cost?.amount!, 18));
        };
      };
    };
    loadBalance();
  }, [account, chain, ethBalance, mintConfig.actionConfig.cost?.amount, srcToken])

  // Send Transaction //

  const runApproval = useCallback(async () => {
    setLoading(true);
    try {
      if (txConfig && chain?.id !== srcToken.chainId) {
        await switchChain(wagmiConfig, { chainId: srcToken.chainId })
      }
      if (activeTx && activeTx.tokenPayment) {
        const hash = await approveToken({
          wagmiConfig,
          token: srcToken.address,
          spender: activeTx.tx.to,
          amount: activeTx.tokenPayment.amount!,
        }, srcToken.chainId);
        if (hash) setTxHash(hash);
      }
      setRequireApproal(false);
    } catch (e) {
      console.error('Error approving token', e);
    } finally {
      setLoading(false);
      // toast.success('Token Approved.');
    }
  }, [txConfig, chain?.id, srcToken.chainId, srcToken.address, activeTx])

  const runTx = useCallback(async () => {
    setLoading(true);
    try {
      if (txConfig && chain?.id !== txConfig.srcChainId) {
        await switchChain(wagmiConfig, { chainId: txConfig.srcChainId })
      }
      if (txConfig && chain?.id === txConfig.srcChainId) {
        if (activeTx) {
          const hash = await sendTransaction(wagmiConfig, activeTx.tx as EvmTransaction);
          setTxHash(hash);
          toast.success(<>
            Minted!
            <a className='underline hover:opacity-80' target='_blank' href={`https://www.decentscan.xyz/?chainId=${txConfig.srcChainId}&txHash=${hash}`}>View transaction status.</a>
          </>);
        }
      }
    } catch (e) {
      console.error('Error executing transaction', e);
    }
    setLoading(false);
  }, [txConfig, chain?.id, activeTx]);

  const handleApproval = useCallback(() => {
    runApproval();
  }, [runApproval])
  const handleRunTx = useCallback(() => {
    runTx();
  }, [runTx]);

  return (
    <ClientRendered>
      <BoxHooksContextProvider
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      >
        <div className='flex items-center gap-4 relative'>
          {requireApproval ? 
            <button
              disabled={loading || !activeTx}
              onClick={handleApproval}
              className={`${loading || !activeTx ? 'bg-gray-200 text-black' : 'bg-black text-white hover:opacity-80'} w-full py-2 rounded-full`}
            >
              {loading ? <LoadingSpinner /> : 'Approve Token'}
            </button> :
            <button
              disabled={loading || requireApproval || !sufficientBalance || !activeTx}
              onClick={handleRunTx}
              className={`${loading || !sufficientBalance || !activeTx ? 'bg-gray-200 text-black' : 'bg-black text-white hover:opacity-80'} w-full py-2 rounded-full`}
            >
              {loading ? <LoadingSpinner /> : !sufficientBalance ? 'Insufficient Balance' : 'Mint'}
            </button>
          }
          <div className='relative flex items-center gap-4'>
            <div onClick={() => setShowBalanceSelector(!showBalanceSelector)} className='rounded-full border border-black py-1 px-2 bg-white flex items-center hover:opacity-80 cursor-pointer'>
              <div className="box-relative box-w-[30px] box-h-[30px] box-mr-[8px] box-flex box-items-center">
                <Image src={srcToken.logo!} width={24} height={24} alt='token-logo' />
                <ChainIcon chainId={srcToken.chainId} className="box-absolute box-right-0 box-bottom-0" />
              </div>
              <DropDownIcon />
            </div>
            {showBalanceSelector && tokenBalances &&
            <div className='absolute bottom-full right-0 z-10'>
              <BalanceSelector
                className='bg-white text-sm font-sans drop-shadow-lg max-h-96 overflow-y-scroll mb-2'
                setSelectedToken={(tokeninfo: TokenInfo) => {
                  setSrcToken(tokeninfo);
                  setShowBalanceSelector(false);
                }}
                tokenContext={tokenBalances}
              />
            </div>}
          </div>
        </div>
      </BoxHooksContextProvider>
    </ClientRendered>
  );
}

// Prepare Transaction //

const generateResponse = async ({ txConfig, account }: { txConfig: BoxActionRequest, account: Address }) => {
  let req;
  if (account) {
    req = txConfig;
  }

  const url = new URL(BASE_URL);
  url.searchParams.set('arguments', JSON.stringify(req, bigintSerializer));

  const requestOptions = {
    method: 'GET',
    headers: { 'x-api-key': process.env.NEXT_PUBLIC_DECENT_API_KEY as string },
  };

  try {
    const response = await fetch(url.toString(), requestOptions);
    const textResponse = await response.text();
    const actionResponse = JSON.parse(textResponse, bigintDeserializer);

    return {
      config: req,
      response: actionResponse,
    };
  } catch (e) {
    console.error('Error getting response', e);
    return {
      config: null,
      response: null,
    };
  };
};