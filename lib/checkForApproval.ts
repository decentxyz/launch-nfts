import { ApproveTokenArgs } from '@decent.xyz/box-hooks';
import { Address, EvmAddress, BoxActionResponse } from '@decent.xyz/box-common';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { erc20Abi } from 'viem';
import { wagmiConfig } from './wagmiConfig';
import { ActiveChainIds } from '../utils/types';

const getAllowance = async ({
  user,
  token,
  spender,
  chainId,
}: {
  user: Address;
  spender: Address;
  token: Address;
  chainId: ActiveChainIds;
}) => {
  return await readContract(wagmiConfig, {
    address: token as EvmAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [user as EvmAddress, spender as EvmAddress],
    chainId: chainId,
  });
};

export const approveToken = async ({
  token,
  spender,
  amount,
}: ApproveTokenArgs, chainId: ActiveChainIds) => {
  try {
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

export const checkForApproval = async ({
  userAddress: user,
  actionResponse,
  srcChainId,
}: {
  userAddress: Address;
  actionResponse: BoxActionResponse;
  srcChainId: ActiveChainIds;
}) => {
  const { tokenPayment, tx } = actionResponse;
  if (!tokenPayment || !tx) {
    return false;
  }
  const { to: spender } = tx;
  const { isNative, amount, tokenAddress: token } = tokenPayment;
  if (isNative) {
    console.log(
      '⛽️ token selected for payment, skipping token allowance check.'
    );
    return false;
  }
  const allowance = await getAllowance({ token, spender, user, chainId: srcChainId });
  console.log(`
    allowance: ${allowance}
    about to spend: ${amount}
  `);

  if (allowance < amount) {
    console.log("Requires approval");
    return true;
  }
};