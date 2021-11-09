import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import classNames from "classnames";
import React from "react";

type Props = {
  state: "initial" | "verifying" | "success" | "error";
  onClick: () => void;
};
export function SignButton({ state, onClick }: Props) {
  const { publicKey, signMessage } = useWallet();

  if (!publicKey || !signMessage) {
    return null;
  }

  let content;
  switch (state) {
    case "verifying":
      content = "Verifying wallet...";
      break;
    case "error":
      content = "Error verifying wallet, please try again";
      break;
    case "success":
      content = "Success!";
      break;
    default:
      content = "Verify wallet";
      break;
  }

  const buttonClasses = classNames("btn", "btn-lg", "mt-4", {
    "btn-primary": state === "initial",
    "btn-success": state === "success",
    "btn-error": state === "error",
  });

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={state === "verifying"}
    >
      {content}
    </button>
  );
}
