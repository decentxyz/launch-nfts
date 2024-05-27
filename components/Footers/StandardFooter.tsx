import Image from "next/image";
import Link from "next/link";

const StandardFooter = ({ className } : { className?: string }) => {

  return <>
    <hr></hr>
    <div className={`${className} mt-4 text-white`}>
      <div className="py-8">
        <Image src='/prohibition-full.png' height={60} width={180} alt='logo' />
      </div>
      <div className="font-thin text-sm space-y-2">
        <div><Link className="hover:opacity-80" target="_blank" href="https://prohibition.art/">Website</Link></div>
        <div><Link className="hover:opacity-80" target="_blank" href="https://warpcast.com/~/channel/prohibition">Warpcast</Link></div>
        <div><Link className="hover:opacity-80" target="_blank" href="https://x.com/ProhibitionArt">Twitter</Link></div>
      </div>
    </div>
  </>
}

export default StandardFooter;