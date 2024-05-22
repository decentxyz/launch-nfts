import Link from "next/link";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

const Navbar = () => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center gap-4 sm:justify-between justify-center p-4`}>
        <Link href='/' className="hidden md:inline-block">
          <Image src='/prohibition-full.png' width={220} height={60} alt='Full logo' />
        </Link>
        <Link href='/' className="md:hidden inline-block">
          <Image src='/prohibition-icon.jpg' width={40} height={40} alt='Icon logo' />
        </Link>
  
        <div className="flex-grow text-center md:text-3xl sm:text-2xl text-lg font-medium sm:mt-12 mt-2">
          {formattedDate}
        </div>
  
        <div className="flex flex-wrap gap-2 justify-end w-auto">
          <ConnectWallet />
        </div>
      </nav>
    </>
  );
};

export default Navbar;