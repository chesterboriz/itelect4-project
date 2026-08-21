import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getItems } from '../api/client';

const ItemsPage: React.FC = () => {
  const itemsQuery = useQuery({ queryKey: ['items'], queryFn: getItems });

  if (itemsQuery.isLoading) return <main className="p-6">Loading lost items...</main>;
  if (itemsQuery.isError) return <main className="p-6 text-rose-700">Unable to load lost items. Start `npm run api`.</main>;

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Lost items</h1>
      <ul className="space-y-3">
        {(itemsQuery.data ?? []).map((item) => (
          <li key={item.id} className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div><h3 className="font-bold">{item.title}</h3><p className="text-sm text-gray-600">{item.locationFound}</p></div>
              <Link to={`/items/${encodeURIComponent(item.id)}`} className="text-blue-600">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ItemsPage;
