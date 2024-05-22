import Link from "next/link";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className={`${styles.navbar} w-full flex items-center gap-4 justify-between justify-center`}>
        <Link href='/' className="hidden md:inline-block">
          <Image src='/prohibition-full.png' width={180} height={60} alt='Full logo' />
        </Link>
        <Link href='/' className="md:hidden inline-block flex items-center gap-4">
          <Image src='/prohibition-icon.svg' width={34} height={34} alt='Icon logo' />
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