import { useAuth } from '../AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        Welcome, <strong>{user?.name}</strong>! You are logged in.
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
