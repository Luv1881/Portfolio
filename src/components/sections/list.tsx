import type { ReactNode } from "react";

interface ListProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => ReactNode;
  getKey?: (item: TItem, index: number) => string | number;
}

export function SectionList<TItem>({ items, renderItem, getKey }: ListProps<TItem>) {
  return (
    <div className="divide-border/40 divide-y">
      {items.map((item, index) => (
        <div key={getKey?.(item, index) ?? index} className="py-6 first:pt-0 last:pb-0">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
