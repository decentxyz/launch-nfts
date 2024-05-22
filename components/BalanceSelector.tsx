import { ReactNode, useState } from "react";
import { ChainId, TokenInfo, UserTokenInfo } from "@decent.xyz/box-common";
import { ClientRendered } from "@decent.xyz/box-ui";
import { UserTokens, FullTokens } from "../lib/contexts/UserTokens";
import { TokenLogo, ChainIcon, DropDownIcon } from "@decent.xyz/box-ui";

interface Tokens extends UserTokenInfo {
  usdValue: number;
}

type BalanceSelectorProps = {
  tokenContext: UserTokens;
  className?: string;
  setSelectedToken?: (s: TokenInfo) => void;
};

export const BalanceSelector = ({
  tokenContext,
  className = "",
  setSelectedToken,
}: BalanceSelectorProps) => {
  const { tokens = [], loadingTokens, tokensError } = tokenContext;
  const [selectedKey, setSelectedKey] = useState<string>();

  const userSelected = (t: FullTokens) => {
    if (setSelectedToken) {
      setSelectedToken(t);
      setSelectedKey(undefined);
    }
  };

  const tokenMap: Map<string, FullTokens[]> = new Map();
  for (const token of tokens) {
    if (!token.balance) continue;
    const key = token.name.replace("(PoS)", "").trim();
    const arr = tokenMap.get(key) ?? [];
    tokenMap.set(key, arr.concat(token));
  }

  return (
    <ClientRendered>
      <div className={"box-balance-selector " + className}>
        {(loadingTokens || tokenMap.size < 1) && <div className={"box-balance-selector-loader"} />}
        {!loadingTokens &&
          [...tokenMap.entries()].map(([key, arr]) => {
            const totalBalance =
              arr.reduce((sum, token) => sum + token.balanceFloat, 0) || 0;
            return (
              <div key={key}>
                <TokenGroupOption
                  balanceText={totalBalance.toFixed(4) + " " + arr[0].symbol}
                  usdBalanceText={totalBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  tokenInfo={arr[0]}
                  tokenAmt={arr.length}
                  onOpen={() =>
                    setSelectedKey(selectedKey === key ? undefined : key)
                  }
                  isSelected={selectedKey === key}
                >
                  <TokenGroupListing
                    key={key + "list"}
                    tokenArr={arr}
                    isOpen={selectedKey === key}
                    openToSide={false}
                    userSelected={userSelected}
                  />
                </TokenGroupOption>
              </div>
            );
          })}
      </div>
    </ClientRendered>
  );
};

function TokenGroupOption({
  children,
  balanceText,
  usdBalanceText,
  tokenInfo: { name, symbol, logo },
  tokenAmt,
  isSelected,
  onOpen,
}: {
  children: ReactNode;
  balanceText: string;
  usdBalanceText: string;
  tokenInfo: UserTokenInfo;
  tokenAmt: number;
  isSelected: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="box-group box-token-group-option">
      <button
        onClick={onOpen}
        className={
          "box-flex box-items-center " +
          "box-p-[12px] box-w-full " +
          "group-hover:box-bg-seasalt "
        }
      >
        <div className="box-relative box-mr-[8px] box-shrink-0">
          <TokenLogo token={{ logo }} className="box-w-[40px] box-h-[40px]" />
        </div>
        <div
          className={
            "box-flex box-flex-col box-items-start box-mr-auto box-min-w-0"
          }
        >
          <span className={"box-font-medium box-text-md"}>{name}</span>
          <span
            className={"box-opacity-50 box-text-sm group-hover:box-opacity-100"}
          >
            {balanceText}
          </span>
        </div>
        <div className={"box-flex box-flex-col box-items-end box-my-auto"}>
          ${usdBalanceText}
        </div>

        <div className="box-w-[48px] box-flex box-items-center box-justify-end">
          <div className="box-balance-selector-amt">{tokenAmt}</div>
          <div
            className={
              "box-ml-[4px] box-opacity-50 group-hover:box-opacity-100 box-transition-transform " +
              (isSelected ? "-box-rotate-90" : "")
            }
          >
            <DropDownIcon />
          </div>
        </div>
      </button>
      {children}
    </div>
  );
}

function TokenGroupListing({
  openToSide,
  isOpen,
  tokenArr,
  userSelected,
}: {
  openToSide: boolean;
  isOpen: boolean;
  tokenArr: Tokens[];
  userSelected: (t: TokenInfo) => void;
}) {
  let innerEls: ReactNode = tokenArr.map((tokenInfo, i) => (
    <div key={tokenInfo.address + i}>
      <TokenOption
        key={tokenInfo.address}
        tokenInfo={tokenInfo}
        showChainIcon
        className={openToSide ? "box-token-option-s" : "box-token-option-c"}
        onClick={() => userSelected(tokenInfo)}
      />
      {openToSide && <hr className="last:box-hidden" />}
    </div>
  ));

  if (!openToSide) {
    innerEls = (
      <div className="box-min-h-0 box-overflow-hidden">{innerEls}</div>
    );
  }

  return (
    <div
      className={
        (openToSide ? "box-token-group-side " : "box-token-group-collapse ") +
        (isOpen ? "box-token-group-open" : "box-token-group-closed")
      }
    >
      {innerEls}
    </div>
  );
}

function TokenOption({
  tokenInfo: { name, symbol, logo, balanceFloat, chainId, address, usdValue },
  showChainIcon,
  className = "",
  onClick,
}: {
  tokenInfo: Tokens;
  showChainIcon?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "box-min-w-[280px] box-w-full box-flex box-py-[12px] hover:box-bg-seasalt box-items-center " +
        className
      }
    >
      <div className="box-relative box-mr-[8px] box-flex box-items-center box-shrink-0">
        <TokenLogo token={{ logo }} className="box-w-[40px] box-h-[40px]" />
        {showChainIcon && (
          <div className="box-absolute box-right-0 box-bottom-0">
            <ChainIcon
              chainId={chainId}
              className="box-absolute box-right-0 box-bottom-0"
            />
          </div>
        )}
      </div>
      <div
        className={
          "box-flex box-flex-col box-items-start box-pr-[4px] box-mr-auto box-min-w-0"
        }
      >
        <span className={"box-font-medium box-text-md"}>{name}</span>
        <span className={"box-font-light box-text-xs box-whitespace-nowrap"}>
          {balanceFloat
            ? balanceFloat.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " "
            : ""}
          {symbol} on {getChainName(chainId)}
        </span>
      </div>
      <div className={"box-flex box-flex-col box-items-end"}>
        ${usdValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </button>
  );
}

export function getChainName(chainId: ChainId) {
  const name = ChainId[chainId];
  if (!name) return <></>;
  return (
    <span className="box-capitalize">
      {name.replace("_", " ").toLowerCase()}
    </span>
  );
}
