import React, { useMemo } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import ClientWalletProvider from "@components/contexts/ClientWalletProvider";
import { NETWORK } from "@utils/endpoints";

import "../styles/globals.css";
import "../styles/App.css";
import { Toaster } from "react-hot-toast";

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={NETWORK}>
      <ClientWalletProvider wallets={wallets}>
        <ReactUIWalletModalProviderDynamic>
          <Toaster position="bottom-right" reverseOrder={true} />
          <Component {...pageProps} />
        </ReactUIWalletModalProviderDynamic>
      </ClientWalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
