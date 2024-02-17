import { Address } from 'viem';
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
  ethGasToken,
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

export default function MintButton({ mintConfig, account }: { mintConfig: BoxActionRequest, account: Address }) {
  const [srcToken, setSrcToken] = useState<TokenInfo | any>(ethGasToken);
  const [showBalanceSelector, setShowBalanceSelector] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const [sufficientBalance, setSufficientBalance] = useState(true);
  const [txHash, setTxHash] = useState('');
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [config, setConfig] = useState<BoxActionRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState({
    status: 'pending',
    blockExplorers: {
      srcTx: '',
      bridgeTx: '',
      dstTx: '',
    },
  });

  const fetchConfig = useCallback(async () => {
    if (account && srcToken) {
      const response = await generateResponse({ mintConfig, account });
      if (response.config) {
        const config: BoxActionRequest = {
        ...response.config,
        srcToken: srcToken.address as Address,
        srcChainId: srcToken.chainId,
        sender: account,
        dstChainId: response.config.dstChainId,
        actionType: response.config.actionType,
        actionConfig: response.config.actionConfig,
        slippage: response.config.slippage ?? 1,
      }
      setConfig(config);}
    }
  }, [account, mintConfig, srcToken]); 

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    async function loadBalance(){
      if (account && chain) {
        const balance = await fetchBalance({
          address: account,
          chainId: chain?.id,
          formatUnits: 'ether'
        })
        setEthBalance(balance.formatted);
        setSufficientBalance(formatUnits(srcToken.balance || ethBalance, srcToken.decimals) < formatUnits(mintConfig.actionConfig.cost?.amount!, 18));
      };
    };
    loadBalance();
  }, [account, chain])

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
            await new Promise(resolve => setTimeout(resolve, 7000));
          }
        } catch (e) {
          console.error('Error tracking transaction status', e);
          await new Promise(resolve => setTimeout(resolve, 2000));
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
      toastFunction(<div>{txStatus.status === 'Executed' ? 'Minted!' : 'Transaction Failed.'} <a href={returnBlockExplorer}>View transaction.</a></div>);
    }
  }, [txStatus, returnBlockExplorer]);

  // Send Transaction //

  const runTx = useCallback(async () => {
    setLoading(true);
    try {
      if (config && chain?.id !== config.srcChainId && switchNetwork) {
        switchNetwork(config.srcChainId);
      }
      if (config && chain?.id === config.srcChainId) {
        const response = await generateResponse({ mintConfig, account });
        if (response && response.response && response.response.tx) {
          const { hash } = await sendTransaction(response?.response?.tx as EvmTransaction);
          setTxHash(hash);
        }
      }
    } catch (e) {
      console.error('Error executing transaction', e);
    }
    setLoading(false);
  }, [chain?.id, config, mintConfig, account, switchNetwork])

  return (
    <ClientRendered>
      <BoxHooksContextProvider
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      >
        <div className='flex items-center gap-4 relative'>
        {/* TODO: add pre-mint disabled check that user has enough balance & error handling */}
          <button
            disabled={loading || !sufficientBalance}
            onClick={() => runTx()}
            className={`${loading || !sufficientBalance ? 'bg-gray-200 text-black' : 'bg-black text-white hover:opacity-80'} w-full py-2 rounded-full`}
          >
            {loading ? '...' : !sufficientBalance ? 'Insufficient Balance' : 'Mint'}
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
                className='absolute bottom-full right-0 bg-white text-sm font-sans drop-shadow-lg max-h-96 w-full overflow-y-scroll z-10 mb-2'
                selectedToken={srcToken}
                setSelectedToken={(tokeninfo: TokenInfo) => {
                  setSrcToken(tokeninfo);
                  setShowBalanceSelector(false);
                }}
                chainId={mintConfig.actionConfig.chainId}
                address={account}
                selectChains={[ChainId.ARBITRUM, ChainId.OPTIMISM, ChainId.BASE, ChainId.ETHEREUM, ChainId.POLYGON]}
              />}
          </div>
        </div>
      </BoxHooksContextProvider>
    </ClientRendered>
  );
}

// Prepare Transaction //

const generateResponse = async ({ mintConfig, account }: { mintConfig: BoxActionRequest, account: Address }) => {
  let req;
  if (account) {
    req = mintConfig;
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
  }
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