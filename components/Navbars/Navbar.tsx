import Search from "../Search";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import { DecentIcon } from "../../utils/logos";

const Navbar = () => {

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >
        <div className="w-1/5">
          [logo]
        </div>
  
        <div className="flex gap-2 w-1/5 hidden md:flex">
        </div>

        <div className="flex gap-2 w-1/5 hidden md:flex">
        </div>
        
        <Search nav={true} />
        <ConnectWallet />
      </nav>
    </>

  );
};

export default Navbar;