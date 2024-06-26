import Link from "next/link";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className={`${styles.navbar} w-full flex items-center gap-4 justify-between justify-center`}>
        <Link href='/' className="hidden md:inline-block">
          <div className="flex items-center gap-2">
            <Image src='/decent-full.png' width={140} height={60} alt='Full logo' />
          </div>
        </Link>
        <Link href='/' className="md:hidden inline-block flex items-center gap-4">
          <Image src='/decent-icon.png' width={34} height={34} alt='Icon logo' />
          <div className="text-xl font-medium">Daily</div>
        </Link>
  
        <div className="flex gap-2 justify-end">
          <ConnectWallet />
        </div>
      </nav>
    </>
  );
};

export default Navbar;