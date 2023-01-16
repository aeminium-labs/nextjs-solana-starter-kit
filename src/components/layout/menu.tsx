import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classNames from "classnames";

type Props = {
  twitterHandle?: string;
  className?: string;
};

export function Menu({ twitterHandle, className }: Props) {
  const { connected } = useWallet();
  const menuClasses = classNames("menu", className);

  return (
    <ul className={menuClasses}>
      {connected && (
        <>
          {twitterHandle && (
            <li className="rounded-box">
              <a
                href={`https://www.twitter.com/${twitterHandle}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost lg:btn mb-1 lg:mr-1 lg:mb-0"
              >
                @{twitterHandle}
              </a>
            </li>
          )}
          <li>
            <label
              htmlFor="bonk-modal"
              className="btn-ghost lg:btn mb-1 lg:mr-1 lg:mb-0"
            >
              Send $Bonk
            </label>
          </li>
          <li>
            <label
              htmlFor="sol-modal"
              className="btn-ghost lg:btn mb-1 lg:mr-1 lg:mb-0"
            >
              Send SOL
            </label>
          </li>
        </>
      )}
      <WalletMultiButton className="btn" />
    </ul>
  );
}
