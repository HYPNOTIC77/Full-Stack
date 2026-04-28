import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const result = register(username, password, role);
      if (result.success) {
        onSwitchToLogin();
      } else {
        setError(result.message);
      }
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <div className="card login-container">
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '1.5rem' }}>Create Account</h2>
      {error && <div style={{ backgroundColor: '#fadbd8', color: '#a93226', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', border: '1px solid #f1b3ac' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2c3e50' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            style={{ width: '100%', marginRight: 0 }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2c3e50' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            style={{ width: '100%', marginRight: 0 }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2c3e50' }}>Account Type</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', marginRight: 0 }}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%' }}>Create Account</button>
        <p style={{ marginTop: '16px', fontSize: '13px', textAlign: 'center', color: '#7f8c8d' }}>
          Already have an account? <span style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }} onClick={onSwitchToLogin}>Sign in here</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
