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
  BalanceSelector,
  ClientRendered,
  ChainIcon
} from '@decent.xyz/box-ui';
import '@decent.xyz/box-ui/index.css';
import { BoxHooksContextProvider } from '@decent.xyz/box-hooks';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { sendTransaction, fetchBalance } from '@wagmi/core';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import DropDownIcon from './DropdownIcon';
import { formatUnits } from 'viem';
import LoadingSpinner from './Spinner';
import { getBlockscanner } from '../lib/utils/blockscanners';

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

const BASE_URL_V1 = 'https://box-v1.api.decent.xyz/api/getBoxAction';

enum ChainNames {
  'Ethereum' = 1,
  'Optimism' = 10,
  'Arbitrum' = 42161,
  'Polygon' = 137,
  'Base' = 8453
}

export default function MintButton({ mintConfig, account, dstTokenAddress }: { mintConfig: BoxActionRequest, account: Address, dstTokenAddress: Address }) {
  const [showBalanceSelector, setShowBalanceSelector] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const [sufficientBalance, setSufficientBalance] = useState(true);
  const [txHash, setTxHash] = useState('');
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [srcToken, setSrcToken] = useState<TokenInfo | any>({
    ...ethGasToken,
    chainId: chain?.id || 1,
  });
  const [txConfig, setTxConfig] = useState<BoxActionRequest>();
  const [activeTx, setActiveTx] = useState<EvmTransaction>();
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState({
    status: 'pending',
    blockExplorers: {
      srcTx: '',
      bridgeTx: '',
      dstTx: '',
    },
  });

  useEffect(() => {
    setTxConfig({
      ...mintConfig,
      srcToken: srcToken.address as Address,
      srcChainId: srcToken.chainId,
      dstToken: dstTokenAddress,
    });
  }, [dstTokenAddress, mintConfig, srcToken])

  const fetchConfig = useCallback(async () => {
    if (account && txConfig) {
      setLoading(true);
      try {
        const { response, config } = await generateResponse({ txConfig: txConfig, account });
        if (response?.tx) setActiveTx(response.tx as EvmTransaction);
        setLoading(false);
      } catch (e) {
        console.log("Error getting tx response", e);
        setLoading(false);
      }
    }
  }, [account, txConfig]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig])

  useEffect(() => {
    async function loadBalance(){
      if (account && chain) {
        const balance = await fetchBalance({
          address: account,
          chainId: srcToken.chainId,
          formatUnits: 'ether'
        })
        setEthBalance(balance.formatted);
        if (srcToken.address === zeroAddress) {
          setSufficientBalance(ethBalance > formatUnits(mintConfig.actionConfig.cost?.amount!, 18));
        } else if (srcToken) {
          setSufficientBalance(formatUnits(srcToken.balance, srcToken.decimals) > formatUnits(mintConfig.actionConfig.cost?.amount!, 18));
        };
      };
    };
    loadBalance();
  }, [account, chain, ethBalance, mintConfig.actionConfig.cost?.amount, srcToken])

  const returnBlockExplorer = useMemo(() => {
    const { status, blockExplorers } = txStatus;
    if (status === 'Executed') {
      return blockExplorers.dstTx || blockExplorers.srcTx;
    } else if (status === 'Failed') {
      return blockExplorers.bridgeTx
        ? `Transaction Failed. Please check ${ChainNames[mintConfig.actionConfig.chainId]} for a refund.`
        : 'Transaction Failed.';
    }
    return '';
  }, [txStatus, mintConfig.actionConfig.chainId]);

  // Track Transaction //

  useEffect(() => {
    let isSubscribed = true;
    const trackTx = async () => {
      let status = '';
      while (isSubscribed && status !== 'Executed' && status !== 'Failed' && txHash) {
        try {
          const { transaction, status: newStatus } = await getTxStatus({ txHash, chainId: mintConfig.srcChainId });
          if (isSubscribed) {
            setTxStatus({
              status: newStatus,
              blockExplorers: {
                srcTx: transaction?.srcTx?.blockExplorer,
                bridgeTx: transaction?.bridgeTx?.blockExplorer,
                dstTx: transaction?.dstTx?.blockExplorer,
              }
            });
          }
          status = newStatus;
          if (status === 'pending') {
            await new Promise(resolve => setTimeout(resolve, 10000));
          }
        } catch (e) {
          console.error('Error tracking transaction status', e);
        }
      }
    };
    trackTx();
    return () => {
      isSubscribed = false;
    };
  }, [txHash, mintConfig.srcChainId]);

  useEffect(() => {
    if (txStatus.status === 'Executed' || txStatus.status === 'Failed') {
      const toastFunction = txStatus.status === 'Executed' ? toast.success : toast.error;
      toastFunction(<div>{txStatus.status === 'Executed' ? 'Minted!' : 'Transaction Failed.'} <a target='_blank' href={returnBlockExplorer}>View transaction.</a></div>);
    }
  }, [txStatus, returnBlockExplorer]);

  // Send Transaction //

  const runTx = useCallback(async () => {
    setLoading(true);
    try {
      if (txConfig && chain?.id !== txConfig.srcChainId && switchNetwork) {
        switchNetwork(txConfig.srcChainId);
      }
      if (txConfig && chain?.id === txConfig.srcChainId) {
        if (activeTx) {
          const { hash } = await sendTransaction(activeTx as EvmTransaction);
          setTxHash(hash);
          toast.success(<div>Sent!<a target='_blank' href={`https://${getBlockscanner(srcToken.chainId).url}/tx/${txHash}`}> View transaction.</a></div>);
        }
      }
    } catch (e) {
      console.error('Error executing transaction', e);
    }
    setLoading(false);
  }, [txConfig, chain?.id, switchNetwork, activeTx, srcToken.chainId, txHash]);

  const handleRunTx = useCallback(() => {
      runTx();
  }, [runTx]);

  // const availTokens = !(srcToken.chainId === ChainId.OPTIMISM || srcToken.chainId === ChainId.ARBITRUM) ? [zeroAddress] : [];

  return (
    <ClientRendered>
      <BoxHooksContextProvider
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      >
        <div className='flex items-center gap-4 relative'>
        {/* TODO: add pre-mint disabled check that user has enough balance & error handling */}
          <button
            disabled={loading || !sufficientBalance}
            onClick={handleRunTx}
            className={`${loading || !sufficientBalance ? 'bg-gray-200 text-black' : 'bg-black text-white hover:opacity-80'} w-full py-2 rounded-full`}
          >
            {loading ? <LoadingSpinner /> : !sufficientBalance ? 'Insufficient Balance' : 'Mint'}
          </button>
          <div className='relative flex items-center gap-4'>
            <div onClick={() => setShowBalanceSelector(!showBalanceSelector)} className='rounded-full border border-black py-1 px-2 bg-white flex items-center hover:opacity-80 cursor-pointer'>
              <div className="box-relative box-w-[30px] box-h-[30px] box-mr-[8px] box-flex box-items-center">
                <Image src={srcToken.logo!} width={24} height={24} alt='token-logo' />
                <ChainIcon chainId={srcToken.chainId} className="box-absolute box-right-0 box-bottom-0" />
              </div>
              <DropDownIcon />
            </div>
            {showBalanceSelector &&
              <BalanceSelector
                className='absolute bottom-full right-0 bg-white text-sm font-sans drop-shadow-lg max-h-96 overflow-y-scroll z-10 mb-2'
                selectedToken={srcToken}
                setSelectedToken={(tokeninfo: TokenInfo) => {
                  setSrcToken(tokeninfo);
                  setShowBalanceSelector(false);
                }}
                chainId={mintConfig.actionConfig.chainId}
                address={account}
                selectChains={[ChainId.ARBITRUM, ChainId.OPTIMISM, ChainId.BASE, ChainId.ETHEREUM, ChainId.POLYGON]}
                selectTokens={[zeroAddress]}
              />}
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

  const url = `${BASE_URL_V1}?arguments=${JSON.stringify(
    req,
    bigintSerializer
  )}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_DECENT_API_KEY as string,
      },
    });
    const data = await response.text();

    const actionResponse: BoxActionResponse = JSON.parse(
      data,
      bigintDeserializer
    );

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

// Track Transaction //

const getTxStatus = async ({ txHash, chainId }: { txHash: string, chainId: ChainId }) => {
  const url = `https://api.decentscan.xyz/getTransaction?txHash=${txHash}&chainId=${chainId}`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    return JSON.parse(data);
  } catch (e) {
    console.error('Error getting response', e);
    return null;
  }
}