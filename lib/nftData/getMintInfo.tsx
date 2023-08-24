import { mintSig } from "../utils/minting/abiRegistry";
import { Address, parseUnits } from "viem";
import { trackedNfts } from "../utils/minting/trackedNfts";

export interface MintInfoProps {
  mintMethod: string;
  params: any;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  price: string;
}

class MintMethod {
  mintMethod: string;
  params: any[];

  constructor(mintMethod: string, params: any[]) {
    this.mintMethod = mintMethod;
    this.params = params;
  }
}

class ZoraMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number, price: string) {
    super(mintSig.Zora, [userAddress, quantity, "Minted using The Box on basednfts.co.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"]);
  }
}

class DecentMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number, price: string) {
    super(mintSig.Decent, [userAddress, quantity]);
  }
}

class ThirdWebMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number, price: string) {
    super(mintSig.ThirdWeb, [
      userAddress,
      quantity,
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      parseUnits((parseFloat(price)*quantity).toString(), 18),
      [[], '115792089237316195423570985008687907853269984665640564039457584007913129639935n', parseUnits((parseFloat(price)*quantity).toString(), 18), '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
      '0x00',
    ]);
  }
}

class AnotherblockMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number, price: string) {
    super(mintSig.Anotherblock, [userAddress, 0, quantity, '0x0000000000000000000000000000000000000000000000000000000000000000']);
  }
}

const mintMethodClasses = {
  'Zora': ZoraMintMethod,
  'Decent': DecentMintMethod,
  'ThirdWeb': ThirdWebMintMethod,
  'Anotherblock': AnotherblockMintMethod,
};

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
    };

    return mintInfo;
  };

  const MintMethodClass = mintMethodClasses[targetContract.source];

  // Create an instance of the mint method class
  const mintMethodInstance = new MintMethodClass(userAddress || '0x', quantity, targetContract.price);

  // Override the defaultMintInfo object with the mint method instance's properties
  const mintInfo: MintInfoProps = {
    mintMethod: mintMethodInstance.mintMethod,
    params: mintMethodInstance.params,
    startDate: targetContract.startDate,
    endDate: targetContract.endDate,
    maxTokens: targetContract.maxTokens || undefined,
    price: (parseFloat(targetContract.price) * quantity).toString(),
  };

  return mintInfo;
};
