import React, { useState, useEffect } from 'react';

const OfflineIndicator = ({ isDarkMode = false }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className={`px-4 py-3 border-b transition-colors duration-200 ${
      isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className={`text-sm font-medium transition-colors duration-200 ${
          isDarkMode ? 'text-red-300' : 'text-red-700'
        }`}>
          You are offline. Please check your internet connection.
        </span>
      </div>
    </div>
  );
};

export default OfflineIndicator; 