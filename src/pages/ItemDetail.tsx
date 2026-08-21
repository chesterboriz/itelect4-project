import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getItem } from '../api/client';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const itemQuery = useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id as string),
    enabled: Boolean(id),
  });

  if (!id) return <main className="p-6">Invalid item URL.</main>;
  if (itemQuery.isLoading) return <main className="p-6">Loading item...</main>;
  if (itemQuery.isError || !itemQuery.data) return <main className="p-6 text-rose-700">Item not found.</main>;

  const item = itemQuery.data;
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
