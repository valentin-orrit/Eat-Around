import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Guc from '../pages/Guc'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the banner
    const hasSeenBanner = localStorage.getItem('cookieBannerDismissed');
    if (!hasSeenBanner) {
      setIsVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem('cookieBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
<div className="fixed mb-4 w-3/5 bottom-0 right-0 mr-4 rounded-md bg-eagreen text-eaoffwhite p-4 shadow-lg z-50">
  <div className="flex items-center justify-between text-start">
    <p className="text-sm">
      This website uses cookies to enhance your browsing experience. By continuing to use this site, you acknowledge our use of cookies.
    </p>
    <div className="flex items-center space-x-4">
      
      <div className="pl-3">
        <Link
            to="/guc"
            className="text-eaoffwhite hover:bg-eaorange px-3 rounded-full text-sm font-semibold"
        >
            <Guc />
            General Conditions of Use
        </Link>
      </div>
      <button
        onClick={dismissBanner}
        className="p-1 hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Dismiss cookie notice"
      >
        <X size={20} />
      </button>
    </div>
  </div>
</div>
  );
};

export default CookieBanner;