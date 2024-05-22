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
  
        <div>
          date
        </div>
        
        {/* <Search nav={true} /> */}
        <div className="w-1/5 flex justify-end">
          <ConnectWallet />
        </div>
      </nav>
    </>

  );
};

export default Navbar;