'use client';

import { useState, useEffect } from 'react';
import { User, ApiResponse } from '@/types';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      const json: ApiResponse<User[]> = await res.json();
      if (json.success && json.data) {
        setUsers(json.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: parseInt(age) }),
      });

      const json: ApiResponse<User> = await res.json();
      if (json.success) {
        setName('');
        setAge('');
        setError('');
        await fetchUsers();
      } else {
        setError(json.error || 'Failed to add user');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const json: ApiResponse<null> = await res.json();
      if (json.success) {
        await fetchUsers();
      } else {
        setError(json.error || 'Failed to delete user');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="vstack gap-4 gap-md-5">
      {/* Add User Form */}
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="h4 fw-semibold mb-4">Add New User</h2>
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleAddUser} className="vstack gap-3">
          <div className="row g-3">
            <div className="col-12 col-md-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            </div>
            <div className="col-12 col-md-6">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
            />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary align-self-start"
          >
            Add User
          </button>
        </form>
      </div>
      </div>

      {/* Users List */}
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="h4 fw-semibold mb-4">Users List</h2>
        {loading ? (
          <p className="text-secondary mb-0">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-secondary mb-0">No users yet. Add one above!</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id!)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
