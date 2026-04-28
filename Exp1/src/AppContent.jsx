import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductManager from './components/ProductManager';

const AppContent = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <header>
        <h1 style={{ letterSpacing: '0.5px' }}>Shopping Store</h1>
        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontWeight: '500' }}>Welcome, <strong>{user.name}</strong></span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>

      <main>
        {!isLoggedIn ? (
          showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onSwitchToRegister={() => setShowRegister(true)} />
          )
        ) : (
          <ProductManager />
        )}
      </main>
    </div>
  );
};

export default AppContent;
