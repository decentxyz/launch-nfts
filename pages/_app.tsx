import "@decent.xyz/the-box/index.css";
import '@rainbow-me/rainbowkit/styles.css'; 
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { BoxThemeProvider } from "@decent.xyz/the-box";
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Metadata from '../components/Metadata';
import AtlasSnippet from "../components/CustomerSupport";
import { SearchContextProvider } from "../lib/contexts/SearchContext";

const myBoxTheme = {
  mainBgColor: "#FFFFFF",
  boxSubtleColor2: '#000000',
  boxDialogBgColor: '#FFFFFF',
  boxLoadingBadgeColor: '#F0EFEF'
}

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'basednfts.co',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={lightTheme({
          accentColor: '#000000',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        >
        <Metadata />
        <AtlasSnippet />
        <BoxThemeProvider theme={myBoxTheme}>
          <SearchContextProvider>
            <Component {...pageProps} />
          </SearchContextProvider>
        </BoxThemeProvider>
        <Analytics />
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;