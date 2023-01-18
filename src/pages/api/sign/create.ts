import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NETWORK } from "@utils/endpoints";
import { MEMO_PROGRAM_ID, NONCE } from "@utils/globals";

export type SignCreateData = {
  tx: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignCreateData>
) {
  if (req.method === "POST") {
    const { publicKeyStr } = req.body;

    const connection = new Connection(NETWORK);
    const publicKey = new PublicKey(publicKeyStr);

    // Ideally this would be stored in a DB for each publicKey
    // using something like crypto.randomBytes(16).toString("base64");
    const nonce = NONCE || "";

    const tx = new Transaction();
    tx.add(
      new TransactionInstruction({
        programId: MEMO_PROGRAM_ID,
        keys: [],
        data: Buffer.from(nonce, "utf8"),
      })
    );

    const blockHash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;

    tx.feePayer = publicKey;
    tx.recentBlockhash = blockHash;

    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });

    const txBase64 = serializedTransaction.toString("base64");

    res.status(200).json({ tx: txBase64 });
  } else {
    res.status(405).json({ tx: "" });
  }
}
