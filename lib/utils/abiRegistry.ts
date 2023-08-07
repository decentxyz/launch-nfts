import { BigNumber, ethers } from "ethers";
import { Address } from "wagmi";

interface ParamProps {
  address: Address,
  quantity: number,
  price: BigNumber
}

export const abiRegistry = (props: ParamProps) => {
  return ({
    ThirdWeb: {
      mintMethod: "function claim(address _receiver,uint256 _quantity,address _currency,uint256 _pricePerToken,tuple _allowlistProof,bytes _data)",
      params: [props.address, props.quantity, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", props.price, [["0x0000000000000000000000000000000000000000000000000000000000000000"], 10, props.price, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"], "0x"]
    },
    $BASED: {
      mintMethod: "function mintWithRewards(address recipient,uint256 quantity,string comment,address mintReferral)",
      params: [props.address, props.quantity, "Minted with The Box", ethers.constants.AddressZero]
    }
  })
}