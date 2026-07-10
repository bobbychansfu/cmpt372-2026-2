
const BASE = 'http://localhost:3001';

export interface User {
  username: string;
  name: string;
}

export async function login(username: string, password: string): Promise<User> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(error ?? 'Login failed');
  }
  const data = (await res.json()) as { user: User };
  return data.user;
}

export async function logout(): Promise<void> {
  await fetch(`${BASE}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

// Returns the current user, or null if the session is not valid.
export async function me(): Promise<User | null> {
  const res = await fetch(`${BASE}/me`, { credentials: 'include' });
  if (!res.ok) return null;
  const data = (await res.json()) as { user: User };
  return data.user;
}
