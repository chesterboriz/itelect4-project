import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
      <div className="mt-4 max-w-sm space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="student@example.com" />
      </div>
      <Button type="button" onClick={handleLogin} className="mt-4">Sign in</Button>
    </main>
  );
};

export default Login;
