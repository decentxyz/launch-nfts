import { MintInfoProps } from "./trackedNfts";
import { Address } from "viem";
import { trackedNfts } from "./trackedNfts";
import { mintMethodClasses } from "../../utils/nft-constants/mintMethods";


export const getMintInfo = (contractAddress: Address, quantity: any, userAddress?: Address, price?: string) => {
  
  // Find the contract information in the contractAddresses array
  const targetContract = trackedNfts.find(nft => nft.address.toLocaleLowerCase() === contractAddress.toLocaleLowerCase());
  if (!targetContract) {
    console.log("No contract found.");
    const mintInfo: MintInfoProps = {
      mintMethod: '',
      params: [],
      startDate: 0,
      endDate: 0,
      maxTokens: undefined,
      price: '',
      mintFee: '',
      totalPrice: ''
    };

    return mintInfo;
  };

  const MintMethodClass = mintMethodClasses[targetContract.source];

  // Create an instance of the mint method class
  const mintMethodInstance = new MintMethodClass(userAddress || '0x', quantity, targetContract.price, targetContract.token || '0x', targetContract.id || 0);

  // Override the defaultMintInfo object with the mint method instance's properties
  const mintInfo: MintInfoProps = {
    mintMethod: mintMethodInstance.mintMethod,
    params: mintMethodInstance.params,
    startDate: targetContract.startDate,
    endDate: targetContract.endDate,
    maxTokens: targetContract.maxTokens || undefined,
    price: (parseFloat(targetContract.price) * quantity).toString(),
    mintFee: (parseFloat(targetContract.mintFee) * quantity).toString(),
    totalPrice: ((parseFloat(targetContract.mintFee) + parseFloat(targetContract.price)) * quantity).toString(),
  };

  return mintInfo;
};
