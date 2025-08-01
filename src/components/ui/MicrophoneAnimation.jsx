import React from 'react';

const MicrophoneAnimation = ({ isListening, isDarkMode = false }) => {
  return (
    <div className="relative">
      {/* Main microphone button */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}>
        <span className="text-xl">
          {isListening ? '⏹️' : '🎤'}
        </span>
      </div>

      {/* Pulsing animation when listening */}
      {isListening && (
        <>
          {/* Outer pulse ring */}
          <div className="absolute inset-0 w-12 h-12 border-2 border-red-400 rounded-full animate-ping opacity-75"></div>
          
          {/* Middle pulse ring */}
          <div className="absolute inset-0 w-12 h-12 border-2 border-red-300 rounded-full animate-ping opacity-50" 
               style={{animationDelay: '0.5s'}}></div>
          
          {/* Inner pulse ring */}
          <div className="absolute inset-0 w-12 h-12 border-2 border-red-200 rounded-full animate-ping opacity-25" 
               style={{animationDelay: '1s'}}></div>
        </>
      )}

      {/* Waveform animation (alternative) */}
      {isListening && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full animate-pulse ${
                isDarkMode ? 'bg-red-400' : 'bg-red-500'
              }`}
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MicrophoneAnimation; 