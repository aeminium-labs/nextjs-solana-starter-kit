import { Connection } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NETWORK } from "@utils/endpoints";

export type TxConfirmData = {
  confirmed: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TxConfirmData>
) {
  if (req.method === "POST") {
    const { txSignature } = req.body;

    const connection = new Connection(NETWORK);

    const latestBlockhash = await connection.getLatestBlockhash("finalized");
    try {
      const confirmation = await connection.confirmTransaction({
        signature: txSignature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        res
          .status(200)
          .json({ confirmed: false, message: "Transaction not confirmed" });
      }

      res
        .status(200)
        .json({ confirmed: true, message: "Transaction confirmed" });
    } catch (e) {
      res
        .status(200)
        .json({ confirmed: false, message: "Transaction not confirmed" });
    }
  } else {
    res.status(405).json({ confirmed: false, message: "Method not allowed" });
  }
}
