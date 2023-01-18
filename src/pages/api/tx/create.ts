import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NETWORK } from "@utils/endpoints";
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { DEFAULT_TOKEN, DEFAULT_WALLET } from "@utils/globals";

export type TxCreateData = {
  tx: string;
};

export type Input = {
  payerAddress: string;
  receiverAddress?: string;
  amount?: number;
  type: "sol" | "token";
  tokenAddress?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TxCreateData>
) {
  if (req.method === "POST") {
    const {
      payerAddress,
      receiverAddress = DEFAULT_WALLET,
      amount = 1,
      type = "sol",
      tokenAddress = DEFAULT_TOKEN,
    } = req.body as Input;

    const connection = new Connection(NETWORK);

    const payer = new PublicKey(payerAddress);
    const receiver = new PublicKey(receiverAddress);

    let transaction = new Transaction();

    if (type === "token") {
      const splToken = new PublicKey(tokenAddress);
      const mint = await getMint(connection, splToken);

      let payerAta = await getAssociatedTokenAddress(
        mint.address, // token
        payer, // owner
        false
      );

      let receiverAta = await getAssociatedTokenAddress(
        mint.address, // token
        receiver, // owner
        false
      );

      try {
        await getAccount(connection, receiverAta);
      } catch (e) {
        // Create ATA on behalf of receiver
        transaction.add(
          createAssociatedTokenAccountInstruction(
            payer,
            receiverAta,
            receiver,
            mint.address
          )
        );
      }

      transaction.add(
        createTransferCheckedInstruction(
          payerAta, // from
          mint.address, // mint
          receiverAta, // to
          payer, // from's owner
          amount * 10 ** mint.decimals, // amount
          mint.decimals // decimals
        )
      );
    }

    if (type === "sol") {
      // Add a transfer instruction to execute
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: payer,
          toPubkey: receiver,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
    }

    const blockHash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;

    transaction.feePayer = payer;
    transaction.recentBlockhash = blockHash;

    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });

    const transactionBase64 = serializedTransaction.toString("base64");

    res.status(200).json({ tx: transactionBase64 });
  } else {
    res.status(405).json({ tx: "" });
  }
}
