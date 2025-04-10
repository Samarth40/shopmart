import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt, FaSearch, FaUser, FaBars, FaTimes, FaHome, FaHeart, FaBoxOpen, FaTags } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      setSearchVisible(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/80 backdrop-blur-sm py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center group"
          >
            <span className="mr-2 text-3xl transform transition-transform duration-500 group-hover:rotate-12">🛒</span>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text relative">
              ShopMart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <>
                <NavItem to="/" label="Home" icon={<FaHome />} current={location.pathname === '/'} />
                <NavItem to="/categories" label="Categories" icon={<FaBoxOpen />} current={location.pathname === '/categories'} />
                <NavItem to="/deals" label="Deals" icon={<FaTags />} current={location.pathname === '/deals'} />
                
                <Link 
                  to="/cart" 
                  className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 mx-1 ${
                    location.pathname === '/cart' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <span className={`absolute inset-0 rounded-full ${location.pathname === '/cart' ? 'bg-emerald-100 scale-100' : 'bg-gray-100 scale-0 hover:scale-100'} transition-transform duration-300 ease-out`}></span>
                  <FaShoppingCart size={20} className="relative z-10" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all animate-pulse-slow shadow-md">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="border-l border-gray-200 h-6 mx-2"></div>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-2 py-1 rounded-full text-gray-700 hover:text-emerald-600 transition-all duration-300">
                    <span className="font-medium">Account</span>
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      {user?.username?.charAt(0).toUpperCase() || <FaUser size={14} />}
                    </div>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                        <FaUser className="inline mr-2" size={14} />
                        Profile
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                        <FaHeart className="inline mr-2" size={14} />
                        Wishlist
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <FaSignOutAlt className="inline mr-2" size={14} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="relative inline-flex items-center px-6 py-2.5 rounded-full font-medium overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:opacity-100"></span>
                <span className="absolute inset-0 w-full h-full border-2 border-emerald-600 rounded-full"></span>
                <span className="relative text-emerald-600 group-hover:text-white transition duration-300 ease-out">
                  <FaUser className="inline mr-2" size={14} />
                  Login
                </span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <Link 
                to="/cart" 
                className="relative p-2 mr-2 text-gray-700"
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl overflow-y-auto z-50" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">ShopMart</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="px-4 py-6">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 mb-6 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        {user?.username?.charAt(0).toUpperCase() || <FaUser size={16} />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.username || 'User'}</p>
                        <p className="text-sm text-gray-500">Welcome back!</p>
                      </div>
                    </div>
                    
                    <nav className="space-y-1">
                      <MobileNavItem to="/" icon={<FaHome />} label="Home" onClick={() => setMobileMenuOpen(false)} />
                      <MobileNavItem to="/categories" icon={<FaBoxOpen />} label="Categories" onClick={() => setMobileMenuOpen(false)} />
                      <MobileNavItem to="/deals" icon={<FaTags />} label="Deals" onClick={() => setMobileMenuOpen(false)} />
                      <MobileNavItem to="/cart" icon={<FaShoppingCart />} label="Shopping Cart" onClick={() => setMobileMenuOpen(false)} />
                      <MobileNavItem to="/wishlist" icon={<FaHeart />} label="Wishlist" onClick={() => setMobileMenuOpen(false)} />
                      
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-emerald-50 transition-colors mt-1"
                        >
                          <FaSignOutAlt className="mr-3 text-gray-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </nav>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FaUser size={40} className="text-emerald-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Welcome to ShopMart</h3>
                    <p className="text-gray-500 mb-6 text-center">Sign in to view your account and orders</p>
                    <Link
                      to="/login"
                      className="w-full py-3 bg-emerald-600 text-white text-center rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login / Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Desktop Navigation Item Component
const NavItem = ({ to, label, icon, current }) => (
  <Link 
    to={to} 
    className={`relative flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300 ${
      current ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
    }`}
  >
    <span className={`absolute inset-0 rounded-full ${current ? 'bg-emerald-100 scale-100' : 'bg-gray-100 scale-0 hover:scale-100'} transition-transform duration-300 ease-out`}></span>
    <span className="relative z-10">{icon}</span>
    <span className="relative z-10 font-medium">{label}</span>
  </Link>
);

// Mobile Navigation Item Component
const MobileNavItem = ({ to, icon, label, onClick }) => (
  <Link 
    to={to} 
    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-emerald-50 transition-colors"
    onClick={onClick}
  >
    <span className="text-gray-500 mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Header;