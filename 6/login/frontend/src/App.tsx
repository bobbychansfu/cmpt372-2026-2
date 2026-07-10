import RequireAuth from './RequireAuth';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 480, margin: '3rem auto' }}>
      <h1>Login Demo</h1>
      {/* Everything inside the guard requires a valid session */}
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    </div>
  );
}
