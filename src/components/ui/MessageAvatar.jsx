import React from 'react';

const MessageAvatar = ({ message, isDarkMode = false }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getUserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
      👤
    </div>
  );

  const getBotAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold">
      AI
    </div>
  );

  return (
    <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {message.sender === 'user' ? getUserAvatar() : getBotAvatar()}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl px-4 py-3 rounded-lg transition-colors duration-200 ${
        message.sender === 'user' 
          ? 'bg-blue-500 text-white' 
          : isDarkMode 
            ? 'bg-gray-700 text-gray-200 border border-gray-600'
            : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <div className="text-sm leading-relaxed">{message.text}</div>
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 ${
          message.sender === 'user' 
            ? 'text-blue-100' 
            : isDarkMode 
              ? 'text-gray-400' 
              : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          <span className="mx-1">•</span>
          <span>{formatDate(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageAvatar; 