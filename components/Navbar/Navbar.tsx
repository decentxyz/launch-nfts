import { useState } from "react";
import styles from "./navbar.module.css";
import { useSearchContext } from "../../lib/contexts/SearchContext";
import ConnectWallet from "./ConnectWallet";
import { BaseLogoBlack } from "../../lib/utils/logos";

const Navbar = (props: any) => {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearch } = useSearchContext();

  const handleSearchInputChange = (event:any) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event:any) => {
    if (event.key === 'Enter') {
      setShowSearch(false);
    }
  }

  // TODO: FIX SIZES FOR EACH ELEMENT; OUTER TWO NEED A FIXED WIDTH THAT WORKS ON THEIR STATES
  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={showSearch ? "#0052FF" : "currentColor"} className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          {showSearch ?
            <input
              type="text"
              placeholder="Search by address..."
              className="font-thin pl-w py-1 px-2 text-[#0052FF] w-fit"
              onChange={handleSearchInputChange}
              onKeyDown={handleSubmit}
            /> :
            <div onClick={() => {setShowSearch(true)}} className="pl-2 cursor-pointer hover:text-gray-500"> 
              <p className="text-xl font-thin">Contract</p>
              <p className="text-lg font-thin">Search</p>
            </div>
          }
        </div>

        <div className="flex gap-2">
          <p className="text-xs flex items-center">1 day <span className="text-2xl font-light"> {" {"}</span></p>
          <div>
            <p className="text-[13px] text-[#0052FF]">{props.oneDay?.mintCount?.toLocaleString()} <span className="text-[12px] text-black">minted</span></p>
            <p className="text-[13px] text-[#0052FF]">{Math.ceil(props.oneDay?.mintVolume)?.toLocaleString()} ETH <span className="text-[12px] text-black">mint vol.</span></p>
          </div>
        </div>

        <div className="flex items-center">
          {BaseLogoBlack("25", "25")} <p className="pl-4 text-2xl font-medium">NFTs</p>
        </div>

        <div className="flex gap-2">
          <p className="text-xs flex items-center">7 day <span className="text-2xl font-light"> {" {"}</span></p>
          <div>
            <p className="text-[13px] text-[#0052FF]">{props.sevenDay?.mintCount?.toLocaleString()} <span className="text-[12px] text-black">minted</span></p>
            <p className="text-[13px] text-[#0052FF]">{Math.ceil(props.sevenDay?.mintVolume)?.toLocaleString()} ETH <span className="text-[12px] text-black">mint vol.</span></p>
          </div>
        </div>

        <ConnectWallet />
      </nav>
    </>

  );
};

export default Navbar;