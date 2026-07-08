import { useState, type FormEvent } from 'react';
import { useAuth } from '../AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <div>
        <label>
          Username{' '}
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div style={{ marginTop: 8 }}>
        <label>
          Password{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" disabled={busy} style={{ marginTop: 12 }}>
        {busy ? 'Logging in…' : 'Log in'}
      </button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <p style={{ color: '#666', fontSize: 13 }}>Try bobby / cmpt372</p>
    </form>
  );
}
