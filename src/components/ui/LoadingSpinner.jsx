import React from 'react';

const LoadingSpinner = ({ type = 'dots', size = 'default', isDarkMode = false }) => {
  const getSpinnerContent = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className={`rounded-full animate-bounce ${
                size === 'small' ? 'w-1 h-1' : 'w-2 h-2'
              } ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
              <div className={`rounded-full animate-bounce ${
                size === 'small' ? 'w-1 h-1' : 'w-2 h-2'
              } ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`} 
              style={{animationDelay: '0.1s'}}></div>
              <div className={`rounded-full animate-bounce ${
                size === 'small' ? 'w-1 h-1' : 'w-2 h-2'
              } ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`} 
              style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              AI is thinking...
            </span>
          </div>
        );
      
      case 'pulse':
        return (
          <div className="flex items-center space-x-3">
            <div className={`rounded-full animate-pulse ${
              size === 'small' ? 'w-3 h-3' : 'w-4 h-4'
            } ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Processing...
            </span>
          </div>
        );
      
      case 'spinner':
        return (
          <div className="flex items-center space-x-3">
            <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${
              size === 'small' ? 'w-4 h-4' : 'w-6 h-6'
            }`}></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading...
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`px-4 py-3 rounded-lg transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
        : 'bg-white border border-gray-200 text-gray-800'
    }`}>
      {getSpinnerContent()}
    </div>
  );
};

export default LoadingSpinner; 