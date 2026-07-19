import React from 'react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <section style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>User</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </section>
  );
};
