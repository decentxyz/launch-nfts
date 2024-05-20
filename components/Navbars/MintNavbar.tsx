import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { PartnerLogos } from "../../lib/nftData/trackedNfts";
import { DecentIcon } from "../../utils/logos";
import Search from "../Search";

const MintNavbar = ({
  all,
  address
}: {
  all?: boolean,
  address?: string
}) => {

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >

        <div className="flex items-center gap-4">
          <Link href='/' className="flex items-center hover:opacity-80">
            <span>{DecentIcon("20", "20")}</span> <p className="pl-2">NFTs</p>
          </Link>
          {all && <><p className="text-2xl">/</p>
           <Search />
          </>}
          <p className="text-2xl">/</p>
          <Link href="/all" className={`${all && 'text-primary'} hover:opacity-80`}>View all</Link>
          {!all && address && <><p className="text-2xl">/</p>
           <p className="text-primary">{address.slice(0,4)+"..."+address.slice(-4)}</p>
          </>}
        </div>

        <ConnectWallet />
      </nav>
    </>

  );
};

export default MintNavbar;