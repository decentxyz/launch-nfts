import { Address, parseUnits } from "viem";
import { mintSig } from "./abiRegistry";

class MintMethod {
  mintMethod: string;
  params: any[];

  constructor(mintMethod: string, params: any[]) {
    this.mintMethod = mintMethod;
    this.params = params;
  }
}

class ZoraMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number) {
    super(mintSig.Zora, [userAddress, quantity, "Minted using The Box on basednfts.co.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"]);
  }
}

class DecentMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number) {
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
  constructor(userAddress: Address, quantity: number) {
    super(mintSig.Anotherblock, [userAddress, 0, quantity, '0x0000000000000000000000000000000000000000000000000000000000000000']);
  }
}

class ManifoldMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number, price: string, contractAddress: Address, id: number) {
    super(mintSig.Manifold, [contractAddress, id, 0, [], userAddress]);
  }
}

class HighlightMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number, price: string, contractAddress: Address, id: number) {
    super(mintSig.Highlight, [id, quantity, userAddress]);
  }
}

class Nfts2MeMintMethod extends MintMethod {
  constructor(userAddress: Address, quantity: number) {
    super(mintSig.Nfts2Me, [userAddress, quantity, "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"]);
  }
}

export const mintMethodClasses = {
  'Zora': ZoraMintMethod,
  'Decent': DecentMintMethod,
  'ThirdWeb': ThirdWebMintMethod,
  'Anotherblock': AnotherblockMintMethod,
  'Manifold': ManifoldMintMethod,
  "Highlight": HighlightMintMethod,
  "Nfts2Me": Nfts2MeMintMethod
};