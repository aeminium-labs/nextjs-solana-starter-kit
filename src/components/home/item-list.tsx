import { Item } from "@components/home/item";
import React from "react";
import { ItemData } from "@pages/api/items/[address]";

type Props = {
  items: Array<ItemData> | undefined;
};

export function ItemList({ items }: Props) {
  if (!items) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <Item data={item} key={item.key} />
      ))}
    </div>
  );
}
