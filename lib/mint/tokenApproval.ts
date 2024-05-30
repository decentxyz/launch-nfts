import { ApproveTokenArgs  } from '@decent.xyz/box-hooks';
import { Address, BoxActionResponse, ChainId, EvmAddress } from '@decent.xyz/box-common';
import { wagmiConfig } from '../wagmiConfig';
import { erc20Abi } from 'viem';
import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';

const getAllowance = async ({
  user,
  token,
  spender,
  chainId,
}: {
  user: Address;
  spender: Address;
  token: Address;
  chainId: ChainId;
}) => {
  return await readContract(wagmiConfig, {
    address: token as EvmAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [user as EvmAddress, spender as EvmAddress],
    chainId: chainId,
  });
};

const approveToken = async ({
  token,
  spender,
  amount,
  wagmiConfig
}: ApproveTokenArgs, chainId: ChainId) => {
  try {
    // @ts-ignore
    const result = await writeContract(wagmiConfig, {
      address: token as EvmAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender as EvmAddress, amount],
      chainId
    });

    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: result, chainId });
    return receipt.transactionHash;
  } catch (e) {
    console.log("Error approving token", e);
  }
};

const userHasApproval = async ({
  token,
  spender,
  user,
  amount,
  chainId
}: {
  token: EvmAddress;
  spender: EvmAddress;
  user: EvmAddress;
  amount: bigint
  chainId: ChainId;
}) => {
  const allowance = await getAllowance({
    token,
    spender,
    user,
    chainId
  });
  return allowance >= amount;
};

export const checkForApproval = async ({
  boxActionResponse,
  user,
  srcChainId
}: {
  boxActionResponse: BoxActionResponse;
  user: EvmAddress;
  srcChainId: ChainId
}) => {
  const { tokenPayment, tx } = boxActionResponse;
  if (!tokenPayment || !tx) {
    return false;
  }
  const { to: spender } = tx;
  const { isNative, amount, tokenAddress: token } = tokenPayment;
  if (isNative) return;

  const hasApproval = await userHasApproval({
    token: token as `0x${string}`,
    spender: spender as `0x${string}`,
    user,
    amount,
    chainId: srcChainId
  });
  const needsApproval = hasApproval ? false : true;

  return needsApproval;
};

export const approveTokenHandler = async ({
  boxActionResponse,
  userAddress,
  srcChainId,
}: {
  boxActionResponse: BoxActionResponse,
  userAddress: Address,
  srcChainId: ChainId,
}) => {
  if (!boxActionResponse || !userAddress) return;
  const { tokenPayment, tx } = boxActionResponse;
  if (!tokenPayment || !tx) {
    return;
  }

  const { to: spender } = tx;
  const { isNative, amount, tokenAddress: token } = tokenPayment;
  if (isNative) return;

  const approveTxHash = await approveToken({
    token,
    spender,
    amount,
    wagmiConfig
  }, srcChainId);
  return approveTxHash;
};