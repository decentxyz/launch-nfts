import Image from "next/image";
import styles from "../../styles/nfts.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { getMintInfo } from "../../lib/nftData/getMintInfo";
import { useAccount } from "wagmi";
import { TheBox } from "@decent.xyz/the-box";
import { ActionType, ChainId } from "@decent.xyz/box-common";
import { parseUnits } from "viem";
import Modal from "../Modal";
import { EtherscanScan } from "../../utils/logos";
import { getBlockscanner } from "../../utils/blockscanners";
import { wagmiConfig } from "../../lib/wagmiConfig";
import MintBox from "./MintBox";

const NftCard = ({
  index,
  collection,
  cardView,
}: {
  index: number;
  collection: any;
  cardView: any;
}) => {
  const blurRef = useRef<HTMLDivElement | null>(null);
  const { address: account } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const mintInfo =
    account && getMintInfo(collection.primaryContract, quantity, account);

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(
      () => blurRef.current && (blurRef.current.style.display = "block")
    );
  }, []);

  const blockscanner = getBlockscanner(collection.chainId);

  return (
    <>
      <Modal
        className={`relative sm:min-w-[500px] max-w-[500px] rounded-lg bg-[#13110F] text-white`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="pb-2 font-thin text-xl">Purchase {collection.name}</div>
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
        <div className={`${styles.containerFlex} rounded-[6px] text-black`}>
          <Image
            className="rounded-md absolute w-full h-full object-cover"
            src={ collection?.image || ""}
            width={400}
            height={400}
            alt=""
          />
          <div
            ref={blurRef}
            className={`${styles.blurrer} rounded-[6px]`}
          ></div>

          <div className="sm:flex p-6 justify-center items-center">
            {!cardView && (
              <div
                className={`w-full h-[400px] flex z-10 mr-2 text-left space-y-3 relative overflow-x-hidden hidden sm:inline-block`}
              >
                <Link
                  href={`/mint/${collection?.chainId}/${collection?.primaryContract}`}
                >
                  <p className="text-6xl hover:opacity-80 cursor-pointer">
                    {collection?.name === "Human"
                      ? "RetroPGF"
                      : collection?.name}
                  </p>
                </Link>
                <div>
                  <p className="font-medium text-xs xl:inline-block hidden pt-2">
                    {collection?.createdAt}
                  </p>
                  <div className="xl:inline-block w-full hidden">
                    <Link
                      target="_blank"
                      className="flex gap-2 text-xs pt-2"
                      href={`https://${blockscanner.url}/address/${
                        collection.primaryContract || ""
                      }`}
                    >
                      {EtherscanScan(18, 20)}{" "}
                      <span className="underline">
                        {" "}
                        View on {blockscanner.name}
                      </span>
                    </Link>
                  </div>
                  <div className="absolute bottom-2 left-0">
                    <button
                      className="text-xl px-16 py-2 bg-white bg-opacity-60 drop-shadow-md rounded-full hover:opacity-80"
                      onClick={() => setIsOpen(true)}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`${
                cardView
                  ? "w-[310px] md:max-w-[380px]"
                  : "w-full max-h-[400px] md:max-w-[400px]"
              } relative aspect-square`}
            >
              <Link
                href={`/mint/${collection?.chainId}/${collection?.primaryContract}`}
              >
                <Image
                  className="absolute inset-0 w-full h-full object-cover"
                  src={collection?.image || ""}
                  width={400}
                  height={400}
                  alt="nft image"
                />
              </Link>
            </div>
          </div>
        </div>

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
