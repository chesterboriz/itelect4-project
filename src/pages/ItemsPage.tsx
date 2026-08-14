import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Item } from '../types';

const mockApiFetchItems = (): Promise<Item[]> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 'item-101', title: 'Black Wallet', category: 'Personal Item', locationFound: 'Library Lobby', description: 'Contains student ID and cash', status: 'reported', isClaimed: false },
        { id: 'item-102', title: 'Blue Umbrella', category: 'Accessory', locationFound: 'Cafeteria', description: 'Foldable umbrella', status: 'reported', isClaimed: false },
      ]);
    }, 200),
  );

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    mockApiFetchItems().then(setItems);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lost items</h1>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">{it.title}</h3>
                <p className="text-sm text-gray-600">{it.locationFound}</p>
              </div>
              <Link to={`/items/${encodeURIComponent(it.id)}`} className="text-blue-600">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ItemsPage;
