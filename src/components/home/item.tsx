import React from "react";

export type ItemData = {
  collectionAddress: string;
  collectionName: string;
  imageUrl: string;
  name: string;
  tokenAddress: string;
  traits: Array<{ trait_type: string; value: string }>;
};

type Props = {
  data: ItemData;
};

export function Item({ data }: Props) {
  const name = data.name;
  const collection = data.collectionName;

  return (
    <div className="card shadow-xl bg-neutral text-neutral-content">
      {data.imageUrl && (
        <figure className="relative h-80">
          <img
            className="object-cover h-80 w-96 aspect-square	"
            src={data.imageUrl}
            alt={`Picture of ${name}`}
          />
        </figure>
      )}
      <div className="card-body p-4 items-center text-center">
        <h2 className="card-title m-0">{name}</h2>
        {collection && <p>{collection}</p>}
      </div>
    </div>
  );
}
