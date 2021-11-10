import { TwitterResponse } from "@pages/api/twitter/[key]";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useDataFetch } from "@utils/use-data-fetch";
import React from "react";

export function Header() {
  const { publicKey } = useWallet();
  const { data } = useDataFetch<TwitterResponse>(
    publicKey ? `/api/twitter/${publicKey}` : null
  );

  const twitterHandle = data && data.handle;

  return (
    <div className="navbar mb-6 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">NextJS Solana Starter Kit</span>
      </div>
      <div className="flex-none">
        {twitterHandle && <span className="mr-4">@{twitterHandle}</span>}
        <WalletMultiButton className="btn btn-ghost" />
      </div>
    </div>
  );
}
