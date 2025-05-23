import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const authLinks = (
    <ul className="flex space-x-4">
      <li>
        <Link to="/dashboard" className="text-gray-300 hover:text-white">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/profiles" className="text-gray-300 hover:text-white">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/posts" className="text-gray-300 hover:text-white">
          Posts
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="text-gray-300 hover:text-white"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="flex space-x-4">
      <li>
        <Link to="/profiles" className="text-gray-300 hover:text-white">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register" className="text-gray-300 hover:text-white">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-gray-300 hover:text-white">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          DevConnector Pro
        </Link>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </div>
    </nav>
  );
};

export default Navbar; 