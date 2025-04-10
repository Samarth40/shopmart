import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaStar, FaArrowLeft, FaShoppingCart, FaHeart, FaShare, FaShippingFast, FaShieldAlt, FaUndoAlt, FaCheck } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const addButtonRef = useRef(null);
  const productImgRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setError(null);

        // Fetch related products from same category
        if (response.data.category) {
          const relatedResponse = await axios.get(`https://fakestoreapi.com/products/category/${response.data.category}`);
          // Filter out current product and limit to 4 items
          const filtered = relatedResponse.data
            .filter(item => item.id !== parseInt(id))
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // Reset state when product ID changes
    setQuantity(1);
    setImageLoaded(false);
    setAddedToCart(false);
    setActiveTab('description');
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Animation for feedback
      if (addButtonRef.current) {
        addButtonRef.current.classList.add('animate-bounce');
        setTimeout(() => {
          addButtonRef.current?.classList.remove('animate-bounce');
        }, 1000);
      }
      
      // Reset feedback after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  // Image zoom effect
  const handleImageZoom = (e) => {
    if (!productImgRef.current) return;

    const { left, top, width, height } = productImgRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    
    productImgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 p-6 rounded-lg text-red-700 mb-6 max-w-lg mx-auto shadow-md">
          <p className="text-lg font-medium">{error || 'Product not found'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/" className="hover:text-emerald-600 transition-colors">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium truncate">{product.title}</span>
      </nav>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="md:flex">
          {/* Product Image with zoom effect */}
          <div className="md:w-1/2 p-6 lg:p-10 flex items-center justify-center bg-gray-50 relative">
            {/* Image placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-gray-50 opacity-50"></div>
            
            <div 
              className="relative w-full h-96 flex items-center justify-center overflow-hidden group"
              onMouseMove={handleImageZoom}
              onMouseLeave={() => {
                if (productImgRef.current) {
                  productImgRef.current.style.transform = 'scale(1)';
                }
              }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
                </div>
              )}
              
              <img 
                ref={productImgRef}
                src={product.image} 
                alt={product.title}
                className={`max-h-80 max-w-full object-contain transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-125 cursor-zoom-in transform-gpu`}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* "Zoom for details" hint */}
              {imageLoaded && (
                <div className="absolute bottom-2 right-2 text-xs bg-black/40 text-white px-2 py-1 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Hover to zoom
                </div>
              )}
            </div>
            
            {/* Promotional badge */}
            {product.price < 100 && (
              <div className="absolute top-6 left-6">
                <div className="bg-rose-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg transform -rotate-3">
                  SALE
                </div>
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 p-6 lg:p-10 lg:pl-12 flex flex-col">
            <div className="mb-3">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full uppercase tracking-wide font-semibold">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>
            
            {/* Rating with animated hover */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 group">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`h-5 w-5 transform transition-transform group-hover:scale-110 ${
                      i < Math.round(product.rating?.rate || 0) 
                        ? "text-yellow-400" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>
            
            {/* Price section with optional discount */}
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.price < 100 && (
                  <span className="ml-2 line-through text-rose-500 text-lg">${(product.price * 1.2).toFixed(2)}</span>
                )}
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <FaCheck className="mr-1" /> In Stock
              </span>
            </div>
            
            {/* Tabbed information */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button 
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'description' 
                      ? 'text-emerald-600 border-b-2 border-emerald-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'features' 
                      ? 'text-emerald-600 border-b-2 border-emerald-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button 
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'shipping' 
                      ? 'text-emerald-600 border-b-2 border-emerald-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping
                </button>
              </div>
              
              <div className="py-4">
                {activeTab === 'description' && (
                  <div className="text-gray-700 leading-relaxed">
                    <p>{product.description}</p>
                  </div>
                )}
                
                {activeTab === 'features' && (
                  <div className="text-gray-700">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Premium quality materials</li>
                      <li>Designed for durability and comfort</li>
                      <li>Modern aesthetic for any setting</li>
                      <li>Easy to clean and maintain</li>
                      <li>Meets international quality standards</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'shipping' && (
                  <div className="text-gray-700">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaShippingFast className="text-emerald-500 mr-2" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center">
                        <FaUndoAlt className="text-emerald-500 mr-2" />
                        <span>30-day easy returns</span>
                      </div>
                      <div className="flex items-center">
                        <FaShieldAlt className="text-emerald-500 mr-2" />
                        <span>2-year warranty included</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quantity selector with improved styling */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-8">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                <button 
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  className="w-10 h-10 flex items-center justify-center border-r border-gray-300 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                >
                  −
                </button>
                <span className="w-12 h-10 flex items-center justify-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center border-l border-gray-300 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col space-y-4 mt-auto">
              {/* Add to cart button with success state */}
              <button
                ref={addButtonRef}
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                  addedToCart 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {addedToCart ? (
                  <>
                    <FaCheck className="mr-2" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </>
                )}
              </button>
              
              {/* Secondary action buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 py-3 border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:border-red-200 hover:bg-red-50 transition-all duration-300 flex items-center justify-center group">
                  <FaHeart className="mr-2 text-gray-400 group-hover:text-red-500 transition-colors" /> 
                  <span className="group-hover:text-red-700 transition-colors">Wishlist</span>
                </button>
                <button className="flex-1 py-3 border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center group">
                  <FaShare className="mr-2 text-gray-400 group-hover:text-emerald-500 transition-colors" /> 
                  <span className="group-hover:text-emerald-700 transition-colors">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products with enhanced styling */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 animate-slide-up relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500 opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-600 opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">You May Also Like</h2>
              <Link 
                to={`/category/${product.category}`} 
                className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                View All <span aria-hidden="true">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, index) => (
                <Link 
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 p-4 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-emerald-500 to-teal-500 transition-opacity duration-300"></div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.category}</div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.round(item.rating?.rate || 0) ? "text-yellow-400" : "text-gray-200"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-12 mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group"
        >
          <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
          Back to products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;