import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import { BaseLogoBlack } from "../../lib/utils/logos";
import Link from "next/link";

const MintNavbar = (props: any) => {
  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >

        <div className="flex items-center gap-4">
          <Link href='/' className="flex items-center hover:opacity-80">{BaseLogoBlack("20", "20")} <p className="pl-2">NFTs</p></Link>
          <p className="text-2xl">/</p>
          {props.all ? <Link href="/all" className="hover:opacity-80">View all</Link> : <p>Mint</p>}
          <p className="text-2xl">/</p>
          <p className="text-[#0052FF]">{props.address.slice(0,4)+"..."+props.address.slice(-4)}</p>
        </div>

        <ConnectWallet />
      </nav>
    </>

  );
};

export default MintNavbar;