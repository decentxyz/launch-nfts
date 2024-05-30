import { useTokenContext } from "../../lib/contexts/UserTokens";
import { useThemeContext } from "../../lib/contexts/ThemeContext";
import { BalanceSelector } from "../BalanceSelector";
import Modal from "../Modal";
import { useState } from "react";

const WalletPill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const result = useTokenContext();
  const { loadingPrice, priceError, totalUsdBalance, tokens } = result;

  const { dark } = useThemeContext();

  return <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className='flex items-center gap-2'>
        <button onClick={() => setIsOpen(!isOpen)} className="hover:opacity-70">
          ${loadingPrice ? '...' : priceError ? ' ' : totalUsdBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </button>
      </div>
      <Modal
        className={`relative max-h-[400px] w-fit bg-white rounded-md overflow-y-auto`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <BalanceSelector tokenContext={result} />
      </Modal>
    </div>
  </div>
}

export default WalletPill;