import "@decent.xyz/the-box/index.css";
import '@rainbow-me/rainbowkit/styles.css'; 
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import { BoxThemeProvider } from "@decent.xyz/the-box";
import { BoxHooksContextProvider } from "@decent.xyz/box-hooks";

import Metadata from '../components/Metadata';
import { SearchContextProvider } from "../lib/contexts/SearchContext";
import { ThemeContextProvider } from "../lib/contexts/ThemeContext";
import { TokenContextProvider } from "../lib/contexts/UserTokens";
import { wagmiConfig } from "../lib/wagmiConfig";

import {
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const myBoxTheme = {
  mainBgColor: "#FFFFFF",
  boxSubtleColor2: '#000000',
  boxDialogBgColor: '#FFFFFF',
  boxLoadingBadgeColor: '#F0EFEF'
}

// export const sfPro = localFont({
//   src: "./fonts/sf-pro-display/SFPRODISPLAYREGULAR.otf",
//   variable: "--font-sf-pro-display",
// });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={lightTheme({
            accentColor: '#000000',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          >
          <ThemeContextProvider>
              <Metadata />
              <BoxThemeProvider theme={myBoxTheme}>
                <BoxHooksContextProvider apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY}>
                  <TokenContextProvider>
                    <SearchContextProvider>
                      <Component {...pageProps} />
                    </SearchContextProvider>
                  </TokenContextProvider>
                </BoxHooksContextProvider>
              </BoxThemeProvider>
              <ToastContainer />
          </ThemeContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;