import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import Login from './components/Login';

// Guard
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;
  return <>{children}</>;
}
