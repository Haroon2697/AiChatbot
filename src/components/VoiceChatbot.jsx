import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const VoiceChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const synth = window.speechSynthesis;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
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

  const getBotReply = async (prompt) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Keep your responses concise and friendly.'
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">AI Voice Assistant</h1>
          </div>
          <button
            onClick={clearMessages}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎤</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Start a conversation</h2>
            <p className="text-gray-600">Click the microphone button below to begin talking with AI</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl px-4 py-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-800'
            }`}>
              <div className="text-sm leading-relaxed">{message.text}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-200">
          <div className="text-red-700 text-sm">{error}</div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={listening ? stopListening : startListening}
            disabled={isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              listening 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="text-xl">
              {listening ? '⏹️' : '🎤'}
            </span>
          </button>
          
          <div className="flex-1 max-w-2xl">
            <div className="text-center text-sm text-gray-500">
              {listening 
                ? 'Listening... Speak now!' 
                : isLoading 
                  ? 'Processing your request...'
                  : 'Click the microphone to start talking'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot; 