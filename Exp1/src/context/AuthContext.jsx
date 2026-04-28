import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Helper to get users from storage
  const getStoredUsers = () => {
    const users = localStorage.getItem('fsd_users');
    return users ? JSON.parse(users) : [];
  };

  const register = (username, password, role) => {
    const users = getStoredUsers();
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('fsd_users', JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  };

  const login = (username, password) => {
    const users = getStoredUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser({
        name: foundUser.username,
        role: foundUser.role,
        token: 'dummy-jwt-token-' + Date.now()
      });
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
