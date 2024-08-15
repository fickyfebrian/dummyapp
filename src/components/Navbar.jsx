import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-pastel-blue p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white font-bold text-xl">Dummy App</Link>

        {/* Hamburger menu for mobile view */}
        <button
          className="text-white block lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="black" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Navbar links */}
        <div className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/products" className="text-white hover:text-pastel-blue-dark transition-colors">Products</Link>
          <Link to="/comments" className="text-white hover:text-pastel-blue-dark transition-colors">Comments</Link>
          <Link to="/users" className="text-white hover:text-pastel-blue-dark transition-colors">Users</Link>
          <Link to="/posts" className="text-white hover:text-pastel-blue-dark transition-colors">Posts</Link>
          <Link to="/recipes" className="text-white hover:text-pastel-blue-dark transition-colors">Recipes</Link>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 lg:mb-0 mb-4"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
