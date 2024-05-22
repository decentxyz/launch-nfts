const MintFooter = (props: any) => {
  const { contractData } = props;

  const curr = contractData[0].chainId === 137 ? 'MATIC' : 'ETH';

  return <>
    <div className="sm:absolute sm:bottom-0 sm:mt-0 mt-12 w-full h-24 py-[12px] px-[24px]">
      <div className="flex justify-between font-thin text-xs">
        <p className="w-1/4 text-left">Total Minted</p>
        <p className="w-1/4 text-center">Mint Volume</p>
        <p className="w-1/4 text-center hidden sm:inline-block">Floor Price</p>
        <p className="w-1/4 text-right">Unique Owners</p>
      </div>
      {contractData && 
        <div className="flex items-center justify-between pt-1">
          <p className="w-1/4 text-left text-primary"> 
          
            {/* | {inputs.maxTokens */}
            {parseInt(contractData[0].tokenCount).toLocaleString()}  
          </p>
          <p className="w-1/4 text-center text-primary">
            
            {/* * inputs.price */}
            {(parseInt(contractData[0].tokenCount)*props.mintPrice).toFixed(2).toLocaleString()}{' '}{curr}
          </p>
          <p className="w-1/4 text-center text-primary hidden sm:inline-block">
            {contractData[0].floorAsk?.price?.amount?.decimal || 0}{' '}{curr}
          </p>
          <p className="w-1/4 text-right text-primary">
            {contractData[0].ownerCount.toLocaleString()}
          </p>
        </div>
      }
    </div>
  </>
}

export default MintFooter;