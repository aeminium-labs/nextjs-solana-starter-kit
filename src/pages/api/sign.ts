import { sign } from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { publicKeyStr, encodedSignature, messageStr } = req.body;
    const message = new TextEncoder().encode(messageStr);
    const publicKey = new PublicKey(publicKeyStr);
    const signature = bs58.decode(encodedSignature);

    console.log("Message received", messageStr);

    // Verify that the bytes were signed using the private key that matches the known public key
    if (!sign.detached.verify(message, signature, publicKey.toBytes())) {
      res.status(401).json({ message: "Invalid signature!" });
    }

    res.status(200).json({ message: "Wallet verified" });
  } else {
    res.status(405).json({ message: "Only do POST" });
  }
}
