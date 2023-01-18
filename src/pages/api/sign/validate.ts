import { Transaction } from "@solana/web3.js";
import { MEMO_PROGRAM_ID, NONCE } from "@utils/globals";
import { NextApiRequest, NextApiResponse } from "next";

export type SignValidateData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignValidateData>
) {
  if (req.method === "POST") {
    const { signedTx } = req.body;

    const tx = Transaction.from(Buffer.from(signedTx, "base64"));

    // Ideally this would be retrieved from a DB for each publicKey
    const nonce = NONCE;

    try {
      const inx = tx.instructions[0];
      if (
        !inx.programId.equals(MEMO_PROGRAM_ID) ||
        inx.data.toString("utf8") != nonce ||
        !tx.verifySignatures()
      ) {
        res.status(401).json({ message: "Invalid signature!" });
      } else {
        res.status(200).json({ message: "Wallet verified" });
      }
    } catch (e) {
      res.status(401).json({ message: "Invalid signature!" });
    }
  } else {
    res.status(405).json({ message: "Only do POST" });
  }
}
