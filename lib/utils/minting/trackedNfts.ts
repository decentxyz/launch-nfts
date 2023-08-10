import { mintSig } from "./abiRegistry";
import { Address } from 'wagmi';
import { parseUnits } from "viem";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

export const contractAddresses = [
  { address: '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89', ocs: true },
  { address: '0xea2a41c02fa86a4901826615f9796e603c6a4491', ocs: true },
  // { address: '0xC85f505B43FcbFFBF7808A55bC4E8ceCAC18D85B', ocs: false },
  // { address: '0x454C9aC1dFd5F0b4DD2887818be9624b26c848A4', ocs: false },
  // { address: '0x1a126d5d53815e44d8635f3a7e4547cf3dedced9', ocs: false },
  // { address: '0xcf512c90887f195f64ae2d0ded42c98a5aa466fb', ocs: false },
  // { address: '0xe9030896cf8acd38d3a9a8484a16d29d6f9ddc78', ocs: false },
  // { address: '0x23548a31f191d2619c52c79f9d7c6d50b2508d99', ocs: false },
  // { address: '0xaf8000cec22904c8e3fbdd0bbd6e459ba4d95ac0', ocs: false },
  // { address: '0xfd683cf95e380526d25017b40180d381d0c6ee9d', ocs: false },
  // { address: '0xB311Ec23c4A7578a4c18F66774a5d7b51DD1DD07', ocs: false },
  // { address: '0x167e861Af4f113af4b48F0879d136A0f983c1322', ocs: false },
  // { address: '0x146790446c5D37A89D0F6b33809DDF7D68E57892', ocs: false },
  // { address: '0x12213A4Aa03E139dCD71B36Bc612C7f02800B03e', ocs: false },
  // { address: '0xeFc3F45706639e186F154976C97aA89AfCD90F05', ocs: false },
  // { address: '0x836198F984431EcdC97A7549C1Bd6B3Cd9E7a89B', ocs: false },
  // { address: '0xD6592C787815e378c45e6F83950450E0957078ab', ocs: false },
]

export const getOcsNfts = () => {
  return contractAddresses
    .filter(item => item.ocs === true)
    .map(item => item.address);
}

export const getMintInfo = (contractAddress: Address, userAddress: Address, quantity: number) => {
  let mintInfo: {
    mintMethod: string;
    params: any;
    startDate?: number;
    endDate?: number;
    maxTokens?: number;
    price: string;
  } = {
    mintMethod: "",
    params: [],
    startDate: 0,
    endDate: 0,
    maxTokens: 0,
    price: ''
  };
  switch (contractAddress) {
    case contractAddresses[0].address:
      mintInfo.mintMethod = mintSig.Zora;
      mintInfo.params = [userAddress, quantity, "Minted using The Box.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"];
      mintInfo.startDate = 1691593200;
      mintInfo.endDate = 1693540800;
      mintInfo.price = "0.0";

      break;
    case contractAddresses[1].address:
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, quantity, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", parseUnits("0", 18), [["115792089237316195423570985008687907853269984665640564039457584007913129639935"], parseUnits("0", 18), "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"], "0x"];
      mintInfo.startDate = 1691593200;
      mintInfo.endDate = 1693540800;
      mintInfo.price = "0.0";

      break;
    // case contractAddresses[2].address:

    //   break;
    // case contractAddresses[3].address:

    //   break;
    // case contractAddresses[4].address:

    //   break;
    // case contractAddresses[5].address:

    //   break;
    // case contractAddresses[6].address:

    //   break;
    
  };
  return mintInfo;
};