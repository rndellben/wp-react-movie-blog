import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(username, password);

      if (result.success) {
        onClose();
      } else {
        setError(
          result.error || 'An unknown error occurred. Please try again.'
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        'Something went wrong. Please check your connection and try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Username
        </label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all'
          required
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Password
        </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all'
          required
        />
      </div>
      {error && (
        <div className='bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-lg'>
          {error}
        </div>
      )}
      <button
        type='submit'
        className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800'>
        Login
      </button>
    </form>
  );
};
