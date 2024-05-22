import { BoxActionResponse } from "@decent.xyz/box-common";
import { ProcessStep } from "../../utils/lookups";

export const getProcessStep = ({
  userAddress,
  isLoading,
  connectedChain,
  srcChainId,
  boxActionResponse,
  isApproving,
  hasApproval,
  hasGasForApproval,
  isExecuting,
  hasFunds
}: {
  userAddress: string | null;
  isLoading: boolean;
  connectedChain: number | null;
  srcChainId: number;
  boxActionResponse: BoxActionResponse | null;
  isApproving: boolean;
  hasApproval: boolean;
  hasGasForApproval: boolean;
  isExecuting: boolean;
  hasFunds: boolean;
}): ProcessStep => {
  if (!userAddress) return ProcessStep.ConnectWallet;
  if (isLoading) return ProcessStep.Loading;
  if (connectedChain != srcChainId) return ProcessStep.SwitchNetwork;
  if (connectedChain == srcChainId && boxActionResponse) {
    if (isApproving) return ProcessStep.ApprovingToken;
    if (
      !!boxActionResponse.tokenPayment &&
      !boxActionResponse.tokenPayment.isNative &&
      !hasApproval &&
      hasGasForApproval
    ) {
      return ProcessStep.ApproveToken;
    }
    if (isExecuting) return ProcessStep.Executing;
    if (!hasFunds) return ProcessStep.InsufficientFunds;
    return ProcessStep.Mint;
  }
  return ProcessStep.Loading;
};