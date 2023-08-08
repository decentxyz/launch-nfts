 import FeaturedNftContainer from "../components/NFTs/FeaturedNftContainer";
 import { useNftData } from '../lib/nftData/useNftData';


 const Test = () => {
  const { nftData, loadingNftData, errorNftData } = useNftData(['0xC85f505B43FcbFFBF7808A55bC4E8ceCAC18D85B', '0xECDE63c35a69F378b4fa83b5D5506F64e3DaBbbC', '0x90fb81ca2fec713c9c6b4b2694eded668b85d5ed','0x8b559fba48051ca930a646493ca3fcf1c7fe1bf9', '0x1a126d5d53815e44d8635f3a7e4547cf3dedced9']);
    return (
        <div>
          {!loadingNftData && !errorNftData &&
            <FeaturedNftContainer nftData={nftData} />
          }
        </div>
    )
 }

 export default Test;