import { useState } from "react";
import MintButton from "./MintButton";
import { zeroAddress, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ChainId, ActionType } from "@decent.xyz/box-common";
import NumberTicker from "../NumberTicker";
import { getMintInfo } from "../../lib/nftData/getMintInfo";
import CountdownText from "../CountdownText";
import { trackedNfts } from "../../lib/nftData/trackedNfts";

const MintBox = ({ collection }: { collection: any }) => {
  const { address, chain } = useAccount();
  const [quantity, setQuantity] = useState(1);

  const mintInfo =
  address && getMintInfo(collection.primaryContract, quantity, address);
  const activeNft = trackedNfts.filter(nft => nft.address.toLowerCase() === collection.primaryContract.toLowerCase());

  const endDate = new Date(activeNft[0]?.day * 1000);

  return <div className="bg-white p-4 rounded-lg space-y-4 z-50">
    <div className="flex justify-between">
      <div>
        <p className="text-black font-medium text-xl">{Number(mintInfo?.price) * quantity} ETH</p>
        <p className="font-thin text-gray-400 text-sm">+ {Number(mintInfo?.mintFee) * quantity} ETH mint fee</p>
      </div>
      <NumberTicker endDate={mintInfo?.endDate} maxTokens={mintInfo?.maxTokens} tokenCount={collection.tokenCount} quantity={quantity} setQuantity={setQuantity} />
    </div>
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
            amount: parseUnits(mintInfo?.totalPrice! || '0.00', 18),
          },
          supplyConfig: {
            sellOutDate: mintInfo?.endDate,
            maxCap: mintInfo?.maxTokens
          },
        }
      }}
    />
    <div className="flex justify-between text-black text-xs">
      <div className="w-1/2">
        {Number(collection.tokenCount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} minted
      </div>
      <div className="w-1/2 text-right">
        <span className="font-thin text-gray-400">Ends in </span>
        <CountdownText dropTime={endDate} />
      </div>
    </div>
  </div>
}

export default MintBox;