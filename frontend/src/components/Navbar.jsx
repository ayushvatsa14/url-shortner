import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo / App Name */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        URL Shortener
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4 flex items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Dashboard
        </Link>

        {/* Auth */}
        {isAuthenticated ? (
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-md text-blue-600 font-medium">
            {user?.name || 'User'}
          </span>
        ) : (
          <Link
            to="/auth"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;