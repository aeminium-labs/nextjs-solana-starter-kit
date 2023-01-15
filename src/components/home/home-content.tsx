import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { useDataFetch } from "@utils/use-data-fetch";
import { ItemList } from "@components/home/item-list";
import { ItemData } from "@components/home/item";
import bs58 from "bs58";
import { Button, ButtonState } from "@components/home/button";
import { toast } from "react-hot-toast";

export function HomeContent() {
  const { publicKey, signMessage } = useWallet();
  const [signState, setSignState] = React.useState<ButtonState>("initial");
  const { data, error } = useDataFetch<Array<ItemData>>(
    publicKey && signState === "success" ? `/api/items/${publicKey}` : null
  );

  // Reset the state
  React.useEffect(() => {
    if (signState !== "initial" && !publicKey) {
      setSignState("initial");
    }
  }, [signState, publicKey]);

  const onSignClick = async () => {
    if (publicKey && signMessage && signState !== "loading") {
      setSignState("loading");
      const signToastId = toast.loading("Signing message...");

      try {
        // Encode anything as bytes
        const messageStr = "This can be anything you want!";
        const message = new TextEncoder().encode(messageStr);

        // Sign the bytes using the wallet
        const signature = await signMessage(message);
        const publicKeyStr = publicKey.toBase58();

        const data = {
          publicKeyStr,
          encodedSignature: bs58.encode(signature),
          messageStr,
        };

        let response = await fetch("/api/sign", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.status === 200) {
          setSignState("success");
          toast.success("Message signed", { id: signToastId });
        } else {
          setSignState("error");
          toast.error("Error verifying wallet, please try again", {
            id: signToastId,
          });
        }
      } catch (error: any) {
        setSignState("error");
        toast.error("Error verifying wallet, please try again", {
          id: signToastId,
        });
      }
    }
  };

  if (error) {
    return (
      <p className="text-center p-4">
        Failed to load items, please try connecting again
      </p>
    );
  }

  if (publicKey && signState === "success" && !data) {
    return <p className="text-center p-4">Loading wallet information...</p>;
  }

  return (
    <div className="grid grid-cols-1">
      <div className="text-center">
        {publicKey ? (
          signState !== "success" && (
            <div className="card border-2 border-primary mb-5">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-center mb-2">
                  Please verify your wallet to see items
                </h2>
                <Button
                  state={signState}
                  onClick={onSignClick}
                  className="btn-primary"
                >
                  Verify wallet
                </Button>
              </div>
            </div>
          )
        ) : (
          <p className="p-4">
            Please connect your wallet to get a list of your NFTs
          </p>
        )}
      </div>
      {publicKey && signState === "success" && data && (
        <ItemList items={data} />
      )}
    </div>
  );
}
