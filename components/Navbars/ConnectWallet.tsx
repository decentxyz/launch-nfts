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
                    <span className='pl-2 border border-white px-4 text-center py-1 rounded-lg text-base'>Connect</span>
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
                <div className="font-light flex items-center gap-2 text-xs sm:text-sm">
                  <button className="hover:opacity-80 flex items-center px-3 py-1 border border-white rounded-md" onClick={openAccountModal} type="button">
                    {WalletIcon('#FFFFFF', "14px", "14px")}
                    <span className='pl-2'>{account.displayName}</span>
                  </button>
                  <div className='border-white border rounded-md sm:min-w-[88px] p-1'>
                    {account && <WalletPill />}
                  </div>
                  <button
                    onClick={openChainModal}
                    type="button"
                    className='hover:opacity-80 sm:flex sm:items-center px-1 py-[5px] border border-white rounded-md hidden sm:inline-block'
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