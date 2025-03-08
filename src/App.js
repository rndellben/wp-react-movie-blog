import { MovieList } from './components/MovieList';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { useState } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';

const UserBar = () => {
  const { user, logout } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className='bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <span className='text-yellow-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </span>
            <span className='font-medium'>
              {user ? user.user_display_name : 'Anonymous'}
            </span>
          </div>
          <div className='space-x-4'>
            {user ? (
              <button
                onClick={logout}
                className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800'>
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginForm(true)}
                  className='px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800'>
                  Login
                </button>
                <button
                  onClick={() => setShowRegisterForm(true)}
                  className='px-4 py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800'>
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Login */}
      {showLoginForm && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50'>
          <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full relative z-50 shadow-2xl border border-gray-700'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600'>
                Login
              </h2>
              <button
                onClick={() => setShowLoginForm(false)}
                className='text-gray-400 hover:text-white transition-colors'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <LoginForm onClose={() => setShowLoginForm(false)} />
          </div>
        </div>
      )}

      {/* Modal for Register */}
      {showRegisterForm && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50'>
          <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full relative z-50 shadow-2xl border border-gray-700'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600'>
                Register
              </h2>
              <button
                onClick={() => setShowRegisterForm(false)}
                className='text-gray-400 hover:text-white transition-colors'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <RegisterForm onClose={() => setShowRegisterForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className='bg-gray-100 min-h-screen'>
        <UserBar />
        <AnimatePresence>
          <MovieList />
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

export default App;
