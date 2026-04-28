import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (username && password) {
      const result = login(username, password);
      if (!result.success) {
        setError(result.message);
      }
    }
  };

  return (
    <div className="card login-container">
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '1.5rem' }}>Sign In</h2>
      {error && <div style={{ backgroundColor: '#fadbd8', color: '#a93226', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', border: '1px solid #f1b3ac' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2c3e50' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ width: '100%', marginRight: 0 }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2c3e50' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ width: '100%', marginRight: 0 }}
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>Sign In</button>
        <p style={{ marginTop: '16px', fontSize: '13px', textAlign: 'center', color: '#7f8c8d' }}>
          Don't have an account? <span style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }} onClick={onSwitchToRegister}>Register here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
