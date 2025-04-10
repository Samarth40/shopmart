import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaTrashAlt, FaArrowLeft, FaCheck, FaShippingFast, FaCreditCard, FaLock } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    // Animate items entering the cart
    if (cart.length > 0) {
      const timer = setTimeout(() => {
        setAnimatedItems(cart.map(item => item.id));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Animate items leaving the cart
    setAnimatedItems([]);
    
    // Show success message after animation
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      
      // Hide the success message after 4 seconds
      setTimeout(() => {
        setOrderPlaced(false);
      }, 4000);
    }, 500);
  };

  const isItemAnimated = (id) => {
    return animatedItems.includes(id);
  };

  const calculateTotal = () => {
    const subtotal = Number(getTotalPrice());
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.07; // 7% tax
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + shipping + tax).toFixed(2)
    };
  };

  const totals = calculateTotal();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 flex items-center">
        <FaShoppingCart className="mr-3 text-emerald-600" />
        Your Shopping Cart
      </h1>
      <p className="text-gray-600 mb-8">Review your items and proceed to checkout</p>

      {orderPlaced && (
        <div className="bg-green-100 border border-green-200 text-green-700 p-6 mb-8 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-2 mr-4">
              <FaCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Order Placed Successfully!</h3>
              <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
            </div>
          </div>
        </div>
      )}

      {cart.length === 0 && !orderPlaced ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <div className="mb-6 flex justify-center">
            <div className="bg-gray-100 rounded-full p-6 inline-block">
              <FaShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`transform transition-all duration-500 ${isItemAnimated(item.id) ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                      >
                        <td className="py-6 px-6">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="h-20 w-20 object-contain mr-4 bg-gray-50 p-2 rounded-md"
                            />
                            <div className="max-w-xs">
                              <Link 
                                to={`/product/${item.id}`}
                                className="text-gray-900 hover:text-emerald-600 transition-colors font-medium line-clamp-2"
                              >
                                {item.title}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-gray-900">${item.price.toFixed(2)}</td>
                        <td className="py-6 px-6">
                          <div className="flex items-center border border-gray-300 rounded-lg w-min">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-6 font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-6 px-6">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-50"
                            aria-label="Remove item"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totals.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{totals.shipping === '0.00' ? 'Free' : `$${totals.shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%)</span>
                  <span>${totals.tax}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totals.total}</span>
                  </div>
                </div>
              </div>
              
              {totals.shipping === '0.00' && (
                <div className="bg-green-50 p-3 rounded-lg text-green-700 text-sm mb-6 flex items-center">
                  <FaShippingFast className="mr-2 text-green-600" />
                  <span>You qualified for free shipping!</span>
                </div>
              )}
              
              <div className="mb-6">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-6 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium flex items-center justify-center"
                >
                  <FaCreditCard className="mr-2" />
                  Proceed to Checkout
                </button>
              </div>
              
              <div className="flex justify-center items-center text-gray-500 text-sm">
                <FaLock className="mr-2" />
                <span>Secure checkout</span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  to="/"
                  className="block w-full text-center py-2 text-emerald-600 hover:text-emerald-800 transition-colors font-medium"
                >
                  <FaArrowLeft className="inline mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;