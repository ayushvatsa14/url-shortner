import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  if(isAuthenticated){
    return <Navigate to="/" replace />;
  }

  return (
   <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {login ? 'Login to your account' : 'Create a new account'}
        </h2>

        {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {login ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-blue-500 hover:underline font-medium"
              onClick={() => setLogin(!login)}
            >
              {login ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;