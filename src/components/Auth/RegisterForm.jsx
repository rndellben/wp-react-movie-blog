import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await register(
      formData.username,
      formData.email,
      formData.password
    );
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Username
        </label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all'
          required
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
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
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all'
          required
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Confirm Password
        </label>
        <input
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
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
        Register
      </button>
    </form>
  );
};
