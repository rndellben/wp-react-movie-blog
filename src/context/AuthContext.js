import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        throw new Error('Invalid username or password.');
      }

      // Create user session
      const userData = {
        username: user.username,
        email: user.email,
        user_display_name: user.username,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Validate inputs
      if (!username || username.length < 3) {
        throw new Error('Username must be at least 3 characters long.');
      }

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (!validatePassword(password)) {
        throw new Error(
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
        );
      }

      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if username or email already exists
      if (users.some((user) => user.username === username)) {
        throw new Error('Username already exists.');
      }

      if (users.some((user) => user.email === email)) {
        throw new Error('Email already exists.');
      }

      // Add new user
      const newUser = {
        username,
        email,
        password, // In a real app, you would hash this password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Automatically log in after registration
      return await login(username, password);
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeaders = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('No authentication found');
    }

    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        getAuthHeaders,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
