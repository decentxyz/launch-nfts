
export const mintSig = {
  ThirdWeb: 'function claim(address,uint256,address,uint256,(bytes32[],uint256,uint256,address),bytes) external payable',

  Zora: "function mintWithRewards(address recipient,uint256 quantity,string comment,address mintReferral)",

  Decent:  "function mint(address to,uint256 numberOfTokens) payable",

  Anotherblock:  "function mint(address _to,uint256 _phaseId,uint256 _quantity,bytes _signature)",

  Manifold: "function mint(address creatorContractAddress,uint256 instanceId,uint32 mintIndex,bytes32[] merkleProof,address mintFor)",

  Highlight: "function vectorMintSeries721(uint256 vectorId,uint48 numTokensToMint,address mintRecipient)"
};
