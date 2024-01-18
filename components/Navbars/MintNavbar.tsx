import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { PartnerLogos } from "../../lib/utils/minting/trackedNfts";
import { DecentIcon } from "../../lib/utils/logos";

const MintNavbar = (props: any) => {
  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >

        <div className="flex items-center gap-4">
          <Link href='/' className="flex items-center hover:opacity-80">
            {props.partner ? 
              <Image src={PartnerLogos[props.partner as keyof typeof PartnerLogos]} height={50} width={80} alt='logo' />
              : <><span>{DecentIcon("20", "20")}</span> <p className="pl-2">NFTs</p></>
            }
          </Link>
          <p className="text-2xl">/</p>
          {props.all ? <Link href="/all" className="hover:opacity-80 text-primary">View all</Link> : <p>Purchase</p>}
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