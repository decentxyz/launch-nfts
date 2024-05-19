import Search from "../Search";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import { DecentIcon } from "../../utils/logos";

const Navbar = (props: any) => {

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >
        <div className="hidden sm:flex items-center w-1/5">
          <Search nav={true} />
        </div>
  
        <div className="flex gap-2 w-1/5 hidden md:flex">
        </div>

        <div className="hidden sm:flex items-center w-1/5">
          {DecentIcon("34", "34")} <a href="https://checkout.decent.xyz/" target="_blank" className="px-4 text-xl hover:text-primary">Checkout Decent</a> <span className="text-2xl pt-[2px]"> ⬛</span>
        </div>

        <div className="flex gap-2 w-1/5 hidden md:flex">
        </div>

        <ConnectWallet />
      </nav>
    </>

  );
};

export default Navbar;