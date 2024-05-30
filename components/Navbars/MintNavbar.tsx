import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
import Image from "next/image";
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
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center gap-2`} >

        <div className="flex items-center gap-4">
          <Link href='/' className="flex items-center hover:opacity-80">
            <Image src='/prohibition-icon.jpg' height={24} width={24} alt='' />
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