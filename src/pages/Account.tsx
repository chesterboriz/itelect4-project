import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const token = useAuthStore((s: any) => s.token);
  const logout = useAuthStore((s: any) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Account</h1>
      <p className="mt-2">Token: {token ?? 'not logged in'}</p>
      <button onClick={handleLogout} className="mt-4 rounded bg-red-600 px-3 py-2 text-white">Logout</button>
    </main>
  );
};

export default Account;
