import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        'http://localhost/wp-headless/wordpress/wp-json/jwt-auth/v1/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      // Check if the response is OK (status 200)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password.');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        return { success: true };
      } else {
        throw new Error('Login failed. No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(
        'http://localhost/wp-headless/wordpress/wp-json/wp/v2/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Automatically log in after successful registration
        return await login(username, password);
      } else {
        return {
          success: false,
          error: data.message || data.error || 'Registration failed',
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Add a helper function to get headers with authorization
  const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
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
        getAuthHeaders, // Export the helper function
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
