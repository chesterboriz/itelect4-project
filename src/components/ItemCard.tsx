import React from 'react';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <section style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>Lost Item</h2>
      <p><strong>Title:</strong> {item.title}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.locationFound}</p>
      <p><strong>Status:</strong> {item.status}</p>
    </section>
  );
};
