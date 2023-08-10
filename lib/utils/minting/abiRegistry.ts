// TODO: pull top collections by mints: https://docs.reservoir.tools/reference/getcollectionstopsellingv1, fetch mint method signature, populate parameters based on similar param names

export const mintSig = {
  ThirdWeb: "function claim(address _receiver,uint256 _quantity,address _currency,uint256 _pricePerToken,tuple _allowlistProof,bytes _data)",

  Zora: "function mintWithRewards(address recipient,uint256 quantity,string comment,address mintReferral)",

  Decent:  "function mint(address to,uint256 numberOfTokens) payable"
};
