import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed mb-4 w-1/3 bottom-0 right-0 mr-4 rounded-md bg-eagreen text-eaoffwhite p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm">
          This website uses cookies to enhance your browsing experience. By continuing to use this site, you acknowledge our use of cookies.
        </p>
        <button
          onClick={dismissBanner}
          className="ml-4 p-1 hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X size={20} />
        </button>
        <span><a>Consultez les Conditions Générales d'Utilisation</a></span>
      </div>
    </div>
  );
};

export default CookieBanner;