import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component scrolls the window to the top whenever the route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to top of page when route changes
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
};

export default ScrollToTop; 