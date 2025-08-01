import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './ui/LoadingSpinner';
import LanguageSelector from './features/LanguageSelector';
import MicrophoneAnimation from './ui/MicrophoneAnimation';
import MessageAvatar from './ui/MessageAvatar';
import OfflineIndicator from './features/OfflineIndicator';

const VoiceChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
  const [textInput, setTextInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textInputRef = useRef(null);

  const synth = window.speechSynthesis;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Apply theme to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const speak = (text) => {
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser!");
      setInputMode('text');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognitionRef.current = recognition;
    setListening(true);
    setError('');

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      addMessage('user', userText);
      setIsLoading(true);
      
      try {
        const botReply = await getBotReply(userText);
        addMessage('bot', botReply);
        speak(botReply);
      } catch (err) {
        addMessage('bot', "Sorry, I couldn't process that request. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setListening(false);
      setIsLoading(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim() || isLoading) return;

    const userText = textInput.trim();
    addMessage('user', userText);
    setTextInput('');
    setIsLoading(true);
    
    try {
      const botReply = await getBotReply(userText);
      addMessage('bot', botReply);
      speak(botReply);
    } catch (err) {
      addMessage('bot', "Sorry, I couldn't process that request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBotReply = async (prompt) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI assistant. Respond in ${selectedLanguage} language. Keep your responses concise and friendly.`
            },
            { role: 'user', content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (err) {
      console.error('OpenAI API error:', err);
      if (err.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key.');
      }
      throw new Error('Failed to get response from AI. Please try again.');
    }
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text, timestamp: new Date() }]);
  };

  const clearMessages = () => {
    setMessages([]);
    setError('');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleInputMode = () => {
    setInputMode(inputMode === 'voice' ? 'text' : 'voice');
    setError('');
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Offline Indicator */}
      <OfflineIndicator isDarkMode={isDarkMode} />

      {/* Header */}
      <div className={`border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <h1 className={`text-xl font-semibold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>AI Assistant</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              isDarkMode={isDarkMode}
            />
            <button
              onClick={toggleInputMode}
              className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                inputMode === 'voice'
                  ? isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              {inputMode === 'voice' ? '🎤 Voice' : '⌨️ Text'}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={clearMessages}
              className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <span className="text-2xl">{inputMode === 'voice' ? '🎤' : '⌨️'}</span>
            </div>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Start a conversation</h2>
            <p className={`transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {inputMode === 'voice' 
                ? 'Click the microphone button below to begin talking with AI'
                : 'Type your message below to start chatting with AI'
              }
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <MessageAvatar 
            key={index} 
            message={message} 
            isDarkMode={isDarkMode}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <LoadingSpinner type="dots" isDarkMode={isDarkMode} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className={`px-6 py-3 border-t transition-colors duration-200 ${
          isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'
        }`}>
          <div className={`text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-red-300' : 'text-red-700'
          }`}>{error}</div>
        </div>
      )}

      {/* Input Area */}
      <div className={`border-t transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } px-6 py-4`}>
        {inputMode === 'voice' ? (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={listening ? stopListening : startListening}
              disabled={isLoading}
              className={`transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <MicrophoneAnimation isListening={listening} isDarkMode={isDarkMode} />
            </button>
            
            <div className="flex-1 max-w-2xl">
              <div className={`text-center text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {listening 
                  ? 'Listening... Speak now!' 
                  : isLoading 
                    ? 'Processing your request...'
                    : 'Click the microphone to start talking'
                }
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="flex items-center space-x-4">
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <input
                  ref={textInputRef}
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type your message here..."
                  disabled={isLoading}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="submit"
                  disabled={!textInput.trim() || isLoading}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    textInput.trim() && !isLoading
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VoiceChatbot; 