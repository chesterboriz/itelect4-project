import React from 'react';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Lost Item</h2>
      <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Title:</span> {item.title}
        </p>
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Category:</span> {item.category}
        </p>
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Location:</span> {item.locationFound}
        </p>
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Status:</span> {item.status}
        </p>
      </div>
    </section>
  );
};
