import { mintSig } from "./abiRegistry";
import { parseUnits, Address } from "viem";

export interface ParamProps {
  contractAddress: Address,
  userAddress: Address,
  quantity: number
}

interface ContractAddress {
  address: Address;
  ocs: boolean;
} 

export const contractAddresses: ContractAddress[] = [
  { address: '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89', ocs: true },
  { address: '0xea2a41c02fa86a4901826615f9796e603c6a4491', ocs: true },
  { address: '0x05b8ee5658F3AD6C268C08B7A70f2FB4B10cf348', ocs: true },
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
  // { address: '0x540d5fd1292cc916d56fb31cce3beddb724dbab3', ocs: false },
  // { address: '0x89518f11346c761c48cb7086bbd2008806f75149', ocs: false },
]

export const getOcsNfts = () => {
  return contractAddresses
    .filter(item => item.ocs === true)
    .map(item => item.address);
}

export interface MintInfo {
  mintMethod: string;
  params: any;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  price: string;
}

export const getMintInfo = (contractAddress: Address, quantity: number, userAddress?: Address, ) => {
  let mintInfo: MintInfo = {
    mintMethod: "",
    params: [],
    startDate: 0,
    endDate: 0,
    maxTokens: 0,
    price: '0.0'
  };
  switch (contractAddress) {
    case contractAddresses[0].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Zora;
      mintInfo.params = [userAddress, 1, "Minted using The Box on basednfts.co.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"];
      mintInfo.startDate = 1691593200;
      mintInfo.endDate = 4294967295;
      mintInfo.maxTokens =4294967295;
      mintInfo.price = "0.000777";

      break;
    case contractAddresses[1].address.toLowerCase():
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, 1, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 0, [[],'115792089237316195423570985008687907853269984665640564039457584007913129639935n', 0, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',], '0x', ];
      mintInfo.startDate = 1690999814;
      mintInfo.price = "0.0";

      break;
    case contractAddresses[2].address.toLowerCase():
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, 1, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', parseUnits('0.01', 18), [[],'115792089237316195423570985008687907853269984665640564039457584007913129639935n', parseUnits('0.01', 18), '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',], '0x00', ];
      mintInfo.startDate = 1691593200;
      mintInfo.endDate = 1693540800;
      mintInfo.price = "0.01";

      break;
    // case contractAddresses[3].address.toLowerCase():

    //   break;
    // case contractAddresses[4].address.toLowerCase():

    //   break;
    // case contractAddresses[5].address.toLowerCase():

    //   break;
    // case contractAddresses[6].address.toLowerCase():

    //   break;
    
  };
  return mintInfo;
};