import { useState } from "react";
import MintButton from "../MintButton";
import { zeroAddress, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ChainId, ActionType } from "@decent.xyz/box-common";
import NumberTicker from "../NumberTicker";
import { getMintInfo } from "../../lib/nftData/getMintInfo";

const MintBox = ({ collection }: { collection: any }) => {
  const { address, chain } = useAccount();
  const [quantity, setQuantity] = useState(1);

  const mintInfo =
  address && getMintInfo(collection.primaryContract, quantity, address);

  return <>
    <MintButton 
      account={address!}
      dstTokenAddress={zeroAddress}
      mintConfig={{
        sender: address!,
        srcChainId: chain?.id as ChainId,
        dstChainId: collection.chainId as ChainId,
        slippage: 1,
        actionType: ActionType.NftPreferMint,
        actionConfig: {
          contractAddress: collection.primaryContract,
          chainId: collection.chainId,
          signature: mintInfo?.mintMethod,
          args: mintInfo?.params,
          cost: {
            isNative: true,
            amount: parseUnits(mintInfo?.price! || '0.00', 18),
          },
          supplyConfig: {
            sellOutDate: mintInfo?.endDate,
            maxCap: mintInfo?.maxTokens
          },
        }
      }}
    />
    <div className="px-4 pt-4 relative">
      <NumberTicker endDate={mintInfo?.endDate} maxTokens={mintInfo?.maxTokens} tokenCount={collection.tokenCount} quantity={quantity} setQuantity={setQuantity} />
    </div>
  </>
}

export default MintBox;