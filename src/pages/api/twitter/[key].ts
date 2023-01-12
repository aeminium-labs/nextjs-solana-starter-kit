import type { NextApiRequest, NextApiResponse } from "next";
import { getHandleAndRegistryKey } from "@solana/spl-name-service";
import { PublicKey, Connection } from "@solana/web3.js";
import { NETWORK } from "@utils/endpoints";

export type TwitterResponse = { handle: string | undefined };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TwitterResponse>
) {
  const { key } = req.query;

  const connection = new Connection(NETWORK);
  if (key && key.length > 0 && typeof key === "string") {
    try {
      const [twitterHandle] = await getHandleAndRegistryKey(
        connection,
        new PublicKey(key)
      );

      res.status(200).json({ handle: twitterHandle });
    } catch (e: any) {
      res.status(404).json({ handle: undefined });
    }
  }
}
