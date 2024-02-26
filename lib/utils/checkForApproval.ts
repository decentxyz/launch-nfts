import { ApproveTokenArgs } from '@decent.xyz/box-hooks';
import { Address, EvmAddress, ChainId, BoxActionResponse } from '@decent.xyz/box-common';
import { erc20ABI, readContract, waitForTransaction, writeContract } from '@wagmi/core';

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
  return await readContract({
    address: token as EvmAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [user as EvmAddress, spender as EvmAddress],
    chainId,
  });
};

export const approveToken = async ({
  token,
  spender,
  amount,
}: ApproveTokenArgs, chainId: ChainId) => {
  try {
    const result = await writeContract({
      address: token as EvmAddress,
      abi: erc20ABI,
      functionName: 'approve',
      args: [spender as EvmAddress, amount],
      chainId
    });
    const receipt = await waitForTransaction({ hash: result.hash, chainId });
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
  srcChainId: ChainId;
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