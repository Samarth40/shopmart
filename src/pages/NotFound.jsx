import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaArrowLeft, FaTools, FaExternalLinkAlt } from 'react-icons/fa';

const NotFound = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 flex items-center justify-center min-h-[calc(100vh-180px)]">
      <div className={`text-center max-w-xl transition-all duration-700 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="text-9xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
              404
            </div>
            <FaExclamationTriangle className="absolute -top-2 -right-6 text-4xl text-yellow-500 animate-pulse-slow" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-4 text-lg">
          Oops! The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 mb-8">
          <div className="flex items-center mb-2">
            <FaTools className="text-emerald-500 mr-2" />
            <p className="text-emerald-700 font-medium">Under Development</p>
          </div>
          <p className="text-emerald-600 text-sm mb-1">
            This page is not developed yet but will be developed soon if needed.
          </p>
          <a 
            href="https://samarthshinde.tech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs flex items-center text-emerald-600 hover:text-emerald-800 transition-colors font-medium"
          >
            Built by samarthshinde.tech <FaExternalLinkAlt className="ml-1 text-xs" />
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/" 
            className="btn-primary w-full sm:w-auto flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary w-full sm:w-auto flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
        
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="relative">
            <div className="h-px w-full bg-gray-300 absolute top-1/2 left-0"></div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 text-gray-500 px-4">
                Lost? Try one of these popular destinations
              </span>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/" className="text-emerald-600 hover:underline px-3 py-1 bg-emerald-50 rounded-full text-sm">
              Home
            </Link>
            <Link to="/cart" className="text-emerald-600 hover:underline px-3 py-1 bg-emerald-50 rounded-full text-sm">
              Shopping Cart
            </Link>
            <Link to="/login" className="text-emerald-600 hover:underline px-3 py-1 bg-emerald-50 rounded-full text-sm">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 