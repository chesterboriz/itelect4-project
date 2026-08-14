import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const login = useAuthStore((s: any) => s.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login('mock-token-123');
    navigate('/', { replace: true });
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2">Click the button to sign in with a mock token.</p>
      <button onClick={handleLogin} className="mt-4 rounded bg-blue-600 px-3 py-2 text-white">Sign in</button>
    </main>
  );
};

export default Login;
