import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const ItemDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (!id) return;
    mockApiFetchItems().then((items) => setItem(items.find((it) => it.id === id) ?? null));
  }, [id]);

  if (!id) return <div>Invalid item</div>;
  if (!item) return <div>Loading item...</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <p className="mt-2">Category: {item.category}</p>
      <p>Found at: {item.locationFound}</p>
      <p className="mt-4">{item.description}</p>
    </main>
  );
};

export default ItemDetail;
