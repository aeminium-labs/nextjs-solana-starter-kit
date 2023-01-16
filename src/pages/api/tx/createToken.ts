import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NETWORK } from "@utils/endpoints";
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";

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
      amount = 1,
    } = req.body;

    const connection = new Connection(NETWORK);

    const payer = new PublicKey(payerAddress);
    const receiver = new PublicKey(receiverAddress);
    const splToken = new PublicKey(
      "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    ); //bonk
    const mint = await getMint(connection, splToken);

    let transaction = new Transaction();

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

    // Add an instruction to execute
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
