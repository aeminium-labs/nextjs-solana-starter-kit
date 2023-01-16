import { Item, ItemData } from "@components/home/item";
import React from "react";

type Props = {
  items: Array<ItemData> | undefined;
};

export function ItemList({ items }: Props) {
  if (!items) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.length === 0 ? (
        <p className="p-4">No NFTs in your wallet</p>
      ) : (
        items.map((item) => <Item data={item} key={item.tokenAddress} />)
      )}
    </div>
  );
}
