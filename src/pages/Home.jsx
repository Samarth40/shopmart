import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaSearch, FaShoppingCart, FaStar, FaChevronRight, FaFilter, FaTimes } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Parse search parameter from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = 'https://fakestoreapi.com/products';
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }
        
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Show feedback animation (handled by CSS)
    const button = e.currentTarget;
    button.classList.add('added-to-cart');
    setTimeout(() => {
      button.classList.remove('added-to-cart');
    }, 1000);
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      {!selectedCategory && !searchTerm && (
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-24 h-24 bg-white rounded-full opacity-10"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-400 rounded-full opacity-10"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 lg:w-3/5 mb-12 md:mb-0 animate-slide-up relative">
              {/* Removed the circular image that was here */}
            
              <div className="inline-block px-4 py-1 bg-emerald-900 bg-opacity-40 rounded-full text-emerald-100 text-sm font-medium mb-4 backdrop-blur-sm">
                Welcome to ShopMart
              </div>
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">Amazing</span> Products
                </h1>
              </div>
              <p className="text-lg md:text-xl mb-8 text-emerald-100 max-w-lg opacity-90 leading-relaxed">
                Shop the latest trends with unbeatable prices and enjoy premium quality.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center bg-white text-emerald-700 px-7 py-3 rounded-full text-base font-medium transition-all duration-300 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-1"
                >
                  Shop Now <FaChevronRight className="inline ml-2" />
                </button>
                <button className="flex items-center px-7 py-3 rounded-full text-base font-medium transition-all duration-300 border-2 border-white/30 hover:border-white hover:shadow-lg hover:shadow-emerald-900/20">
                  Explore Categories
                </button>
              </div>
            </div>
            <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full blur-3xl opacity-20 scale-90"></div>
              <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-emerald-900/20 transform rotate-2 hover:rotate-0 transition-all duration-500 relative z-10">
                <img 
                  src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg" 
                  alt="Featured Product" 
                  className="h-56 md:h-64 lg:h-72 object-contain"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md">
                  Best Seller
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-12 md:h-16 lg:h-20 text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      )}

      <div id="products-section" className="container mx-auto px-4 py-8">
        {/* Creative Search and Filter Section */}
        <div className="mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-12 w-24 h-24 bg-emerald-500 rounded-full opacity-5 blur-xl"></div>
          <div className="absolute -bottom-8 -right-12 w-32 h-32 bg-teal-600 rounded-full opacity-5 blur-xl"></div>
          
          {/* Glass-morphic search container */}
          <div className="bg-white/70 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100 to-transparent opacity-50 rounded-bl-full"></div>
            
            <div className="flex flex-col gap-6">
              {/* Animated search bar */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-emerald-500">
                  <FaSearch className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-transparent rounded-xl focus:ring-0 focus:border-emerald-400 transition-all duration-300 shadow-sm group-hover:shadow-md"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                )}
                
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-focus-within:w-[98%]"></div>
              </div>
              
              {/* Category pills with horizontal scroll on mobile */}
              <div>
                <h3 className="text-gray-700 font-medium mb-3 flex items-center text-sm">
                  <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-2 text-emerald-600">
                    <FaFilter className="h-3 w-3" />
                  </span>
                  Browse by category
                </h3>
                
                <div className="overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                  <div className="flex space-x-2 lg:flex-wrap lg:gap-2">
                    <button 
                      className={`px-4 py-3 text-sm rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                        selectedCategory === '' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md font-medium' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-200 hover:bg-emerald-50'
                      }`}
                      onClick={() => handleCategoryChange('')}
                    >
                      All Products
                    </button>
                    
                    {categories.map(category => (
                      <button 
                        key={category} 
                        className={`px-4 py-3 text-sm rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                          selectedCategory === category 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md font-medium' 
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-200 hover:bg-emerald-50'
                        }`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active filters chips */}
            {(searchTerm || selectedCategory) && (
              <div className="flex items-center mt-5 pt-5 border-t border-gray-100">
                <span className="text-xs text-gray-500 mr-3">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border-2 border-emerald-200 bg-emerald-50 text-emerald-700">
                      "{searchTerm}"
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="ml-1.5 p-0.5 rounded-full bg-emerald-200 text-emerald-700 hover:bg-emerald-300"
                      >
                        <FaTimes className="h-2 w-2" />
                      </button>
                    </span>
                  )}
                  
                  {selectedCategory && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border-2 border-emerald-200 bg-emerald-50 text-emerald-700">
                      {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}
                      <button 
                        onClick={() => setSelectedCategory('')}
                        className="ml-1.5 p-0.5 rounded-full bg-emerald-200 text-emerald-700 hover:bg-emerald-300"
                      >
                        <FaTimes className="h-2 w-2" />
                      </button>
                    </span>
                  )}
                  
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="text-xs text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory 
              ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')
              : searchTerm
                ? `Search results for "${searchTerm}"`
                : "Our Products"
            }
          </h2>
          <div className="h-1 w-24 bg-emerald-600 mt-2"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 card-hover"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Sale tag - show for items under $100 */}
                {product.price < 100 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-md shadow-md">
                      SALE
                    </div>
                  </div>
                )}
                
                {/* Hover actions */}
                <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Wishlist functionality would go here
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                {/* Image container with gradient overlay on hover */}
                <div className="relative h-56 p-6 flex items-center justify-center bg-gray-50 overflow-hidden group-hover:bg-gray-100 transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-emerald-500 to-teal-500 transition-opacity duration-300"></div>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="h-full object-contain transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 border-t border-gray-100">
                  {/* Category badge */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md capitalize">
                      {product.category}
                    </span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.round(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-200"}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Title with line clamp */}
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12 group-hover:text-emerald-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Reviews count */}
                  <div className="flex items-center mb-3">
                    <span className="text-xs text-gray-500">{product.rating?.count || 0} reviews</span>
                  </div>
                  
                  {/* Price and cart button */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.price < 100 && (
                        <span className="ml-1 text-xs text-rose-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="p-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 shadow-sm hover:shadow"
                      aria-label="Add to cart"
                    >
                      <FaShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mt-4">No products found</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">Try a different search term or category.</p>
            <button 
              className="mt-6 btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              View all products
            </button>
          </div>
        )}
      </div>

      {/* Extra Styles */}
      <style jsx>{`
        .added-to-cart {
          animation: addedToCart 1s ease-in-out;
        }
        
        @keyframes addedToCart {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); background-color: #10B981; }
          100% { transform: scale(1); }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;