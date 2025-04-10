import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaCreditCard, 
  FaPaypal, 
  FaApplePay, 
  FaGooglePay, 
  FaShippingFast, 
  FaLock, 
  FaUndo, 
  FaHeadset,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden pt-20 pb-10 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-600 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-3xl">🛒</span>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">ShopMart</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover the best products at unbeatable prices. ShopMart is your 
              one-stop destination for all your shopping needs.
            </p>
            
            <div className="flex space-x-3 mb-6">
              <a href="#" className="p-2.5 bg-gray-700 hover:bg-emerald-600 rounded-full transition-all duration-300 group">
                <FaFacebook size={18} className="text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="p-2.5 bg-gray-700 hover:bg-emerald-600 rounded-full transition-all duration-300 group">
                <FaTwitter size={18} className="text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="p-2.5 bg-gray-700 hover:bg-emerald-600 rounded-full transition-all duration-300 group">
                <FaInstagram size={18} className="text-gray-300 group-hover:text-white" />
              </a>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-full">
                  <FaMapMarkerAlt className="text-emerald-400" />
                </div>
                <span className="text-gray-300">Pune, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-full">
                  <FaPhone className="text-emerald-400" />
                </div>
                <span className="text-gray-300">9265885486</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-full">
                  <FaEnvelope className="text-emerald-400" />
                </div>
                <span className="text-gray-300">samarthshinde4033@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/cart" text="Shopping Cart" />
              <FooterLink to="#" text="Shop by Category" />
              <FooterLink to="#" text="Special Offers" />
              <FooterLink to="#" text="New Arrivals" />
              <FooterLink to="#" text="Best Sellers" />
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block mr-3"></span>
              Customer Service
            </h3>
            <ul className="space-y-3">
              <FooterLink to="#" text="Contact Us" />
              <FooterLink to="#" text="FAQ" />
              <FooterLink to="#" text="Shipping Policy" />
              <FooterLink to="#" text="Returns & Refunds" />
              <FooterLink to="#" text="Privacy Policy" />
              <FooterLink to="#" text="Terms & Conditions" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block mr-3"></span>
              Newsletter
            </h3>
            <p className="text-gray-300 mb-5 leading-relaxed">
              Subscribe to our newsletter for the latest updates, exclusive offers, and promotions.
            </p>
            <form className="mb-5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-700 text-white w-full px-4 py-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-60"
                />
                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 transition-colors w-10 h-10 rounded-md flex items-center justify-center">
                  <FaChevronRight className="text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        {/* Footer Middle Section - Features */}
        <div className="border-t border-gray-700 pt-10 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gray-800 rounded-xl p-5 h-full flex flex-col items-center text-center shadow-lg shadow-black/5 border border-gray-700">
                <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                  <FaShippingFast size={24} className="text-emerald-400" />
                </div>
                <h4 className="font-medium text-white mb-2">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders over $50</p>
              </div>
            </div>
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gray-800 rounded-xl p-5 h-full flex flex-col items-center text-center shadow-lg shadow-black/5 border border-gray-700">
                <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                  <FaLock size={24} className="text-emerald-400" />
                </div>
                <h4 className="font-medium text-white mb-2">Secure Payment</h4>
                <p className="text-sm text-gray-400">100% secure transactions</p>
              </div>
            </div>
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gray-800 rounded-xl p-5 h-full flex flex-col items-center text-center shadow-lg shadow-black/5 border border-gray-700">
                <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                  <FaUndo size={24} className="text-emerald-400" />
                </div>
                <h4 className="font-medium text-white mb-2">Easy Returns</h4>
                <p className="text-sm text-gray-400">30 day return policy</p>
              </div>
            </div>
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gray-800 rounded-xl p-5 h-full flex flex-col items-center text-center shadow-lg shadow-black/5 border border-gray-700">
                <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                  <FaHeadset size={24} className="text-emerald-400" />
                </div>
                <h4 className="font-medium text-white mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-400">Customer support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start order-2 md:order-1">
            <div className="w-14 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
              <FaCreditCard size={20} className="text-white" />
            </div>
            <div className="w-14 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
              <FaPaypal size={20} className="text-white" />
            </div>
            <div className="w-14 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
              <FaApplePay size={20} className="text-white" />
            </div>
            <div className="w-14 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
              <FaGooglePay size={20} className="text-white" />
            </div>
          </div>
          
          <div className="text-center md:text-right order-1 md:order-2">
            <p className="text-gray-400 mb-1">&copy; {currentYear} ShopMart. All rights reserved.</p>
            <p className="text-xs text-gray-500 mb-1">
              This website is a demo project. All products displayed are from FakeStoreAPI.
            </p>
            <p className="text-xs text-gray-500 mb-1">
              Frontend Dev Internship Assignment on Internshala for Grey Scientific Labs
            </p>
            <a 
              href="https://samarthshinde.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Built by samarthshinde.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for footer links with hover animation
const FooterLink = ({ to, text }) => {
  // Determine if the link should go to 404 page
  const isExistingPage = ['/', '/cart', '/login'].includes(to);
  const linkTo = isExistingPage ? to : '/404';
  
  return (
    <li>
      <Link 
        to={linkTo} 
        className="text-gray-300 hover:text-white transition-colors flex items-center group"
      >
        <FaChevronRight className="mr-2 h-2 w-2 text-emerald-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default Footer; 