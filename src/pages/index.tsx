import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header } from "@components/layout/header";
import { PageContainer } from "@components/layout/page-container";
import { HomeContent } from "@components/home/home-content";
import { DrawerContainer } from "@components/layout/drawer-container";
import { ButtonState } from "@components/home/button";
import { Menu } from "@components/layout/menu";
import { TwitterResponse } from "@pages/api/twitter/[key]";
import { TxConfirmData } from "@pages/api/tx/confirm";
import { TxCreateData } from "@pages/api/tx/create";
import { TxSendData } from "@pages/api/tx/send";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { fetcher, useDataFetch } from "@utils/use-data-fetch";
import { toast } from "react-hot-toast";
import { Modal } from "@components/layout/modal";
import { Footer } from "@components/layout/footer";

const Home: NextPage = () => {
  const { publicKey, signTransaction, connected } = useWallet();

  const { data } = useDataFetch<TwitterResponse>(
    connected && publicKey ? `/api/twitter/${publicKey}` : null
  );

  const twitterHandle = data && data.handle;

  const [txState, setTxState] = React.useState<ButtonState>("initial");

  const onTxClick =
    ({
      isToken = false,
      address,
      amount,
    }: {
      isToken: boolean;
      address?: string;
      amount?: string;
    }) =>
    async () => {
      if (connected && publicKey && signTransaction && txState !== "loading") {
        setTxState("loading");
        const buttonToastId = toast.loading("Creating transaction...", {
          id: `buttonToast${isToken ? "Token" : ""}`,
        });

        try {
          // Create transaction
          let { tx: txCreateResponse } = await fetcher<TxCreateData>(
            "/api/tx/create",
            {
              method: "POST",
              body: JSON.stringify({
                payerAddress: publicKey.toBase58(),
                receiverAddress: address
                  ? new PublicKey(address).toBase58()
                  : undefined,
                amount: amount,
                type: isToken ? "token" : "sol",
              }),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );

          const tx = Transaction.from(Buffer.from(txCreateResponse, "base64"));

          // Request signature from wallet
          const signedTx = await signTransaction(tx);
          const signedTxBase64 = signedTx.serialize().toString("base64");

          // Send signed transaction
          let { txSignature } = await fetcher<TxSendData>("/api/tx/send", {
            method: "POST",
            body: JSON.stringify({ signedTx: signedTxBase64 }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });

          setTxState("success");
          toast.success(
            (t) => (
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noreferrer"
              >
                Transaction created
              </a>
            ),
            { id: buttonToastId, duration: 10000 }
          );

          const confirmationToastId = toast.loading(
            "Confirming transaction..."
          );

          const confirmationResponse = await fetcher<TxConfirmData>(
            "/api/tx/confirm",
            {
              method: "POST",
              body: JSON.stringify({ txSignature }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );

          if (confirmationResponse.confirmed) {
            toast.success("Transaction confirmed", {
              id: confirmationToastId,
            });
          } else {
            toast.success("Error confirming transaction", {
              id: confirmationToastId,
            });
          }
        } catch (error: any) {
          setTxState("error");
          toast.error("Error creating transaction", { id: buttonToastId });
        }
      }
    };

  return (
    <>
      <Head>
        <title>NextJS Solana Starter Kit</title>
        <meta
          name="description"
          content="Everything you need to start your Solana dApp"
        />
      </Head>
      <DrawerContainer>
        <PageContainer>
          <Header twitterHandle={twitterHandle} />
          <HomeContent />
          <Footer />
        </PageContainer>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <Menu
            twitterHandle={twitterHandle}
            className="p-4 w-80 bg-base-100 text-base-content"
          />
        </div>
      </DrawerContainer>
      <Modal
        onClick={onTxClick}
        butttonState={txState}
        headerContent="Send some $BONK to someone you love"
        buttonContent="Send $BONK"
        isToken={true}
        id="bonk-modal"
      />
      <Modal
        onClick={onTxClick}
        butttonState={txState}
        headerContent="Send some SOL to someone you love"
        buttonContent="Send SOL"
        id="sol-modal"
      />
    </>
  );
};

export default Home;
