// TODO: pull top collections by mints: https://docs.reservoir.tools/reference/getcollectionstopsellingv1, fetch mint method signature, populate parameters based on similar param names

export const mintSig = {
  ThirdWeb: 'function claim(address,uint256,address,uint256,(bytes32[],uint256,uint256,address),bytes) external payable',

  Zora: "function mintWithRewards(address recipient,uint256 quantity,string comment,address mintReferral)",

  Decent:  "function mint(address to,uint256 numberOfTokens) payable"
};