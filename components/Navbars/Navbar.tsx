import Link from "next/link";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import { DecentIcon } from "../../utils/logos";
const Navbar = () => {

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >
        <Link href='/' className="flex items-center hover:opacity-80">
          <span>{DecentIcon("32", "32")}</span> <p className="pl-2 text-lg font-medium">NFTs</p>
        </Link>
  
        {/* <div>
          date
        </div> */}
        
        {/* <Search nav={true} /> */}
        <div className="w-1/5 flex justify-end">
          <ConnectWallet />
        </div>
      </nav>
    </>

  );
};

export default Navbar;