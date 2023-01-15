import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NETWORK } from "@utils/endpoints";

export type TxCreateData = {
  tx: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TxCreateData>
) {
  if (req.method === "POST") {
    const {
      payerAddress,
      receiverAddress = "9RsT8nDGkaAc8YvFfYr4Cc1spsq1y1jXenHPx9W91xcW",
      amount = 0.01,
    } = req.body;

    const connection = new Connection(NETWORK);

    const payer = new PublicKey(payerAddress);
    const receiver = new PublicKey(receiverAddress);

    let transaction = new Transaction();

    // Add an instruction to execute
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: receiver,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

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
    res.status(405).json({ tx: null });
  }
}
