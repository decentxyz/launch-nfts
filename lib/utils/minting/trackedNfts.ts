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

export interface MintInfo {
  mintMethod: string;
  params: any;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  price: string;
}

export const getOcsNfts = () => {
  return contractAddresses
    .filter(item => item.ocs === true)
    .map(item => item.address);
}

export const contractAddresses: ContractAddress[] = [
  // Base Day 1
  { address: '0x7d5861cfe1C74Aaa0999b7E2651Bf2ebD2A62D89', ocs: true },
  // Bridge to Base
  { address: '0xea2a41c02fa86a4901826615f9796e603c6a4491', ocs: false },
  //FWB
  { address: '0xc9cca8e570f81a7476760279b5b19cc1130b7580', ocs: true },
  // anotherblock
  { address: '0x8b2937eAD425CCC91Fc0ad884638Dc2129c51CB2', ocs: true },
  { address: '0x33eD5107f821bb1465da30B7dCe4Fb7105B0Ad16', ocs: true },
  { address: '0x0c664A85521d5721bca047d29238d9E2a9E9e861', ocs: true },
  // coke
  { address: '0x916555cd5f02e159b84d5247f8660531a4525d2d', ocs: true },
  // stand with crypto
  { address: '0x874ad7c13935f73c7bbe94efbd8e766de2a585eb', ocs: true },
  //Helmet city
  { address: '0x0651996b6a6eebd1fc697e5735a2dca541bbe06b', ocs: false },
  // Heno
  { address: '0x6eE6E88Eb8ae143bb9B4B4B0A2269A080a45ef7E', ocs: false },
  // Paragon
  { address: '0xb999Ec5E57000540cBF821aDdbc69C37bF506f9F', ocs: false },
]

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
      mintInfo.endDate = 1693540800;
      mintInfo.price = (0.000777 * quantity).toString();

      break;
    case contractAddresses[1].address.toLowerCase():
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, quantity, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 0, [[],'115792089237316195423570985008687907853269984665640564039457584007913129639935n', 0, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',], '0x', ];
      mintInfo.startDate = 1690999814;
      mintInfo.endDate = 1693551600;
      mintInfo.price = "0.0";

      break;
    case contractAddresses[2].address.toLowerCase():
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, quantity, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', parseUnits(mintInfo.price, 18), [[],'115792089237316195423570985008687907853269984665640564039457584007913129639935n', parseUnits(mintInfo.price, 18), '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',], '0x00', ];
      mintInfo.startDate = 1691593200;
      mintInfo.endDate = 1691769600;
      mintInfo.price = (.01 * quantity).toString();

      break;
    case contractAddresses[3].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Anotherblock;
      mintInfo.params = [userAddress, 0, quantity, '0x0000000000000000000000000000000000000000000000000000000000000000'];
      mintInfo.startDate = 1691856000;
      mintInfo.endDate = 1692028800;
      mintInfo.price = (0.0022 * quantity).toString();

      break;
    case contractAddresses[4].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Anotherblock;
      mintInfo.params = [userAddress, 0, quantity, '0x0000000000000000000000000000000000000000000000000000000000000000'];
      mintInfo.startDate = 1691856000;
      mintInfo.endDate = 1692028800;
      mintInfo.price = (0.0011 * quantity).toString();

      break;
    case contractAddresses[5].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Anotherblock;
      mintInfo.params = [userAddress, 0, quantity, '0x0000000000000000000000000000000000000000000000000000000000000000'];
      mintInfo.startDate = 1691856000;
      mintInfo.endDate = 1692028800;
      mintInfo.price = (0.00055 * quantity).toString();

      break;
    case contractAddresses[6].address.toLowerCase():
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, quantity, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', parseUnits(mintInfo.price, 18), [[],'115792089237316195423570985008687907853269984665640564039457584007913129639935n', parseUnits(mintInfo.price, 18), '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',], '0x00', ];
      mintInfo.startDate = 1691938800;
      mintInfo.endDate = 1692201600;
      mintInfo.price = (0.014 * quantity).toString();

      break;
    case contractAddresses[7].address.toLowerCase():
      mintInfo.mintMethod = mintSig.ThirdWeb;
      mintInfo.params = [userAddress, quantity, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', parseUnits('0.00', 18), [[],'115792089237316195423570985008687907853269984665640564039457584007913129639935n', parseUnits('0.00', 18), '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',], '0x00', ];
      mintInfo.startDate = 1691766000;
      mintInfo.endDate = 4294967295;
      mintInfo.price = "0.0";

      break;
    case contractAddresses[8].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Zora;
      mintInfo.params = [userAddress, quantity, "Minted using The Box on basednfts.co.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"];
      mintInfo.startDate = 1692201600;
      mintInfo.endDate = 4294967295;
      mintInfo.price = (0.000777 * quantity).toString();
      
      break;
    case contractAddresses[9].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Zora;
      mintInfo.params = [userAddress, quantity, "Minted using The Box on basednfts.co.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"];
      mintInfo.startDate = 1692201600;
      mintInfo.endDate = 1692460800;
      mintInfo.price = (0.000777 * quantity).toString();
      
      break;
    case contractAddresses[10].address.toLowerCase():
      mintInfo.mintMethod = mintSig.Zora;
      mintInfo.params = [userAddress, quantity, "Minted using The Box on basednfts.co.", "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E"];
      mintInfo.startDate = 1692190800;
      mintInfo.endDate = 4294967295;
      mintInfo.price = (0.000777 * quantity).toString();
      
      break;
  };
  return mintInfo;
};