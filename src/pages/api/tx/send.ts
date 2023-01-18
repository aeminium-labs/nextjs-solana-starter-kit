import { Connection, Transaction } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NETWORK } from "@utils/endpoints";

export type TxSendData = {
  txSignature: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TxSendData>
) {
  if (req.method === "POST") {
    const { signedTx } = req.body;

    const connection = new Connection(NETWORK);
    const tx = Transaction.from(Buffer.from(signedTx, "base64"));

    const txSignature = await connection.sendRawTransaction(tx.serialize());

    res.status(200).json({ txSignature });
  } else {
    res.status(405).json({ txSignature: "" });
  }
}
