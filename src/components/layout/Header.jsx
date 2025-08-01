import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              MyApp
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 