import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import React, { ReactNode } from "react";

export type ButtonState = "initial" | "loading" | "success" | "error";

type Props = {
  state: ButtonState;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};
export function Button({ state, onClick, children, className }: Props) {
  const { publicKey } = useWallet();

  if (!publicKey) {
    return null;
  }

  const buttonClasses = classNames("btn", className);

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={state === "loading"}
    >
      {children}
    </button>
  );
}
