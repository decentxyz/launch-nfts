import styles from "../../styles/nfts.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../Modal";
import MintBox from "./MintBox";
import NftMedia from "../NftMedia";

const NftCard = ({
  index,
  collection,
  cardView,
  art
}: {
  index: number;
  collection: any;
  cardView?: boolean;
  art?: string;
}) => {
  const blurRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(
      () => blurRef.current && (blurRef.current.style.display = "block")
    );
  }, []);

  return (
    <>
      <Modal
        className={`relative sm:min-w-[500px] max-w-[500px] rounded-lg bg-[#13110F] text-white`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="pb-2 font-thin text-xl">Mint {collection.name}</div>
        <div className="w-full py-2">
          <MintBox collection={collection} />
        </div>
      </Modal>

      <div
        id={"nft-" + index}
        key={index}
        data-idx={index}
        className={`${styles.nftCard} ${
          cardView ? "w-full" : "w-full md:w-[50vw]"
        } drop-shadow-md `}
      >
        <Link
          href={`/mint/${collection?.chainId}/${collection?.primaryContract}`}
        >
          <div className={`${styles.containerFlex} rounded-[6px] text-black`}>
            <NftMedia media={art || collection?.image} />
            <div
              ref={blurRef}
              className={`${styles.blurrer} rounded-[6px]`}
            ></div>
            <div className="sm:flex p-6 justify-center items-center w-full h-full">
              <div
                className={`${
                  cardView
                    ? "w-[310px] md:max-w-[380px]"
                    : "w-full max-h-[400px] md:max-w-[400px]"
                } relative min-h-[420px]`}
              >
                <NftMedia media={art || collection?.image} />
              </div>
            </div>
          </div>
        </Link>

        <div
          className={`${
            !cardView && "sm:hidden"
          } w-full flex justify-start pt-4`}
        >
          <Link
            href={`/mint/${collection?.chainId}/${
              collection?.primaryContract || ""
            }`}
          >
            <p className="text-right font-thin text-xs hover:opacity-80">
              {"∟"} {" "}
              <span className="font-thin font-medium">{collection?.name}</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NftCard;
