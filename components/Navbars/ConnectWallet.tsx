import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletPill from './WalletPill';
import { WalletIcon } from '../../public/wallet';

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className="font-light text-xl p-4 rounded-md hover:text-opacity-80 text-right" onClick={openConnectModal} type="button">
                    <span className='pl-2'>Connect<br></br>Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className="text-red-500 text-sm font-light p-4 hover:opacity-80" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="font-light p-4 flex items-center gap-2 text-sm">
                  <button className="hover:opacity-80 flex items-center px-3 py-1 border border-black rounded-sm" onClick={openAccountModal} type="button">
                    {WalletIcon('#000000', "14px", "14px")}
                    <span className='pl-2'>{account.displayName}</span>
                  </button>
                  <div className='border-black border rounded-sm min-w-[88px] p-1 flex justify-end'>
                    {account && <WalletPill />}
                  </div>
                  <button
                    onClick={openChainModal}
                    type="button"
                    className='text-lg hover:text-gray-500 flex items-center p-1 border border-black rounded-sm'
                  > 
                    {chain.hasIcon && (
                      <div
                        className="hover:opacity-80"
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 18, height: 18 }}
                          />
                        )}

                      </div>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;