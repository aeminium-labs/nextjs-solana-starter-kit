import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

export function Header() {
  return (
    <div className="navbar mb-6 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">NextJS Solana Starter Kit</span>
      </div>
      <div className="flex-none">
        <WalletMultiButton className="btn btn-ghost" />
      </div>
    </div>
  );
}
