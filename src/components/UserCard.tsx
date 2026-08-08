import React from 'react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">User</h2>
      <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Role:</span> {user.role}
        </p>
      </div>
    </section>
  );
};
