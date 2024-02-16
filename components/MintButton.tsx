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
} from '@decent.xyz/box-common';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { sendTransaction } from '@wagmi/core';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';

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
    if (account) {
      const response = await generateResponse({ mintConfig, account });
      setConfig(response.config ?? null);
    }
  }, [account, mintConfig]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

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
  }, [chain?.id, config, mintConfig, account, switchNetwork]);

  return (<>
    <button
      onClick={() => runTx()}
      className="bg-black px-5 py-2 rounded-full text-white hover:opacity-80"
    >
      {loading ? '...' : 'Send a Tx'}
    </button>
  </>);
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