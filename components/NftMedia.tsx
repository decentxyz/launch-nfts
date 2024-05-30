import Image from "next/image";

const NftMedia = ({ media, mintPage }: { media: string, mintPage?: boolean }) => {

  if (media.includes('.mp4') || media.includes('.mov')) {
    return <video className={`${mintPage ? 'inset-0 w-full h-full object-contain' : 'absolute rounded-md bg-cover w-full h-full object-cover'}`} autoPlay loop muted playsInline>
      <source src={media} type="video/mp4" />
    </video>
  } else {
    return <Image
    className={`${mintPage ? 'inset-0 w-full h-full object-contain' : 'absolute rounded-md bg-cover w-full h-full object-cover'}`}
    src={media}
    width={400}
    height={400}
    alt=""
  />
  }
}

export default NftMedia;