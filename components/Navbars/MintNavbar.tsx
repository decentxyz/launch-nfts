import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { PartnerLogos } from "../../lib/nftData/trackedNfts";
import { DecentIcon } from "../../utils/logos";
import Search from "../Search";

const MintNavbar = (props: any) => {
  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >

        <div className="flex items-center gap-4">
          <Link href='/' className="flex items-center hover:opacity-80">
            {PartnerLogos[props.partner as keyof typeof PartnerLogos] ? 
              <div style={{ height: 30, width: 30 }} className="relative">
                <Image src={PartnerLogos[props.partner as keyof typeof PartnerLogos]} layout="fill" alt='logo' />
              </div>
              : <><span>{DecentIcon("20", "20")}</span> <p className="pl-2">NFTs</p></>
            }
          </Link>
          {props.all && <><p className="text-2xl">/</p>
           <Search />
          </>}
          <p className="text-2xl">/</p>
          <Link href="/all" className={`${props.all && 'text-primary'} hover:opacity-80`}>View all</Link>
          {!props.all && <><p className="text-2xl">/</p>
           <p className="text-primary">{props.address.slice(0,4)+"..."+props.address.slice(-4)}</p>
          </>}
        </div>

        <ConnectWallet />
      </nav>
    </>

  );
};

export default MintNavbar;