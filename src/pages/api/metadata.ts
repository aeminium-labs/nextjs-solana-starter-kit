import type { NextApiRequest, NextApiResponse } from "next";

import { MetadataJson } from "@metaplex/js";
import { fetcher } from "@utils/use-data-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetadataJson>
) {
  const { uri } = req.query;

  try {
    if (uri.length > 0 && typeof uri === "string") {
      const extraData = await fetcher<MetadataJson>(uri);

      res.status(200).send(extraData);
    }
  } catch (e) {}

  res.status(400);
}
