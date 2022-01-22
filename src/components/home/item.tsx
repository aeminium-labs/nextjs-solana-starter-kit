import React from "react";
import { ItemData } from "@pages/api/items/[address]";
import Image from "next/image";
import { useDataFetch } from "@utils/use-data-fetch";
import { MetadataJson } from "@metaplex/js";

type Props = {
  data: ItemData;
};

export function Item({ data }: Props) {
  const name = data.metadata?.data.data.name;
  const metadataURI = data.metadata?.data.data.uri;
  const { data: metadata } = useDataFetch<MetadataJson>(
    metadataURI ? [`/api/metadata?uri=${metadataURI}`, metadataURI] : null
  );

  const collection = metadata?.collection?.name;

  return (
    <div className="card shadow-xl image-full">
      {metadata && metadata.image && (
        <figure className="relative h-80">
          <Image
            src={metadata.image}
            alt={`Picture of ${name}`}
            layout="fill"
          />
        </figure>
      )}
      <div className="card-body p-4 justify-end text-center">
        <h2 className="card-title m-0">{name}</h2>
        {collection && <p>{collection}</p>}
      </div>
    </div>
  );
}
