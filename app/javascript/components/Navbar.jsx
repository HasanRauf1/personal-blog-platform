import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../services/authService';

const Navbar = () => {
  const { authState, checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  // Toggle menu function for small screens
  const toggleMenu = () => {
    const navContent = document.getElementById('nav-content-mobile');
    navContent.classList.toggle('hidden');
  };

  const handleLogout = async () => {
    const result = await logout();
    handleMenuItemClick();

    if (result) {
      await checkAuthStatus()
      navigate('/');
    } else {
      console.error('Logout failed');
    }
  };

  const handleMenuItemClick = async () => {
    if (window.innerWidth < 768) { // Close menu in mobile view
      toggleMenu();
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and branding */}
          <Link to="/" className="text-indigo-900 hover:text-indigo-600 font-bold text-xl">
            Blog Posts
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-indigo-900 hover:text-indigo-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>

          {/* Primary Nav Items for Large Screens */}
          <div className="hidden md:flex items-center space-x-1">
            <Link className="py-2 px-3 text-gray-700 hover:text-gray-900" to="/" onClick={handleMenuItemClick}>Home</Link>
            {authState.signedIn ? (
              <>
                <Link className="py-1 px-3 text-gray-700 hover:text-gray-900" to="/post/new" onClick={handleMenuItemClick}>Create a new Blog</Link>
                <span className="py-1 px-3 text-gray-700">{authState.user.email}</span>
                <button onClick={handleLogout} className="py-1 px-3 bg-indigo-200 rounded hover:bg-indigo-300 text-gray-900">Logout</button>
              </>
            ) : (
              <>
                <Link className="py-1 px-3 bg-indigo-200 rounded hover:bg-indigo-300 text-gray-900" to="/signup" onClick={handleMenuItemClick}>Sign Up</Link>
                <Link className="py-1 px-3 bg-indigo-200 rounded hover:bg-indigo-300 text-gray-900" to="/login" onClick={handleMenuItemClick}>Login</Link>
              </>
            )}
          </div>
        </div>

        {/* Dropdown Menu for Mobile View */}
        <div className="md:hidden hidden" id="nav-content-mobile">
          <Link className="block py-2 px-4 text-sm hover:bg-indigo-200" to="/" onClick={handleMenuItemClick}>Home</Link>
          {authState.signedIn ? (
            <>
              <Link className="block py-2 px-4 text-sm hover:bg-indigo-200" to="/post/new" onClick={handleMenuItemClick}>Create a new Blog</Link>
              <span className="block py-2 px-4 text-sm text-gray-700">{authState.user.email}</span>
              <button onClick={handleLogout} className="block w-full text-left py-1 px-3 bg-indigo-200 rounded hover:bg-gray-300 text-gray-900">Logout</button>
            </>
          ) : (
            <>
              <Link className="block py-2 px-4 text-sm hover:bg-indigo-200" to="/signup" onClick={handleMenuItemClick}>Sign Up</Link>
              <Link className="block py-2 px-4 text-sm hover:bg-indigo-200" to="/login" onClick={handleMenuItemClick}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
