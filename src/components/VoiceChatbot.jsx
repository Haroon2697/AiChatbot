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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🤖 AI Voice Assistant</h1>
        <p className="text-gray-600">Click the microphone to start talking!</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Messages Display */}
      <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-6 bg-gray-50 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎤</div>
            <p>No messages yet. Start a conversation!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-800'
            }`}>
              <div className="text-sm">{message.text}</div>
              <div className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg">
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

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={listening ? stopListening : startListening}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
            listening 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="text-xl">
            {listening ? '⏹️' : '🎤'}
          </span>
          <span>{listening ? 'Stop Listening' : 'Start Listening'}</span>
        </button>

        <button
          onClick={clearMessages}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          🗑️ Clear Chat
        </button>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          listening 
            ? 'bg-red-100 text-red-800' 
            : isLoading 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            listening 
              ? 'bg-red-500 animate-pulse' 
              : isLoading 
                ? 'bg-yellow-500'
                : 'bg-green-500'
          }`}></div>
          <span>
            {listening 
              ? 'Listening...' 
              : isLoading 
                ? 'Processing...'
                : 'Ready'
            }
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 How to use:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click the microphone button to start listening</li>
          <li>• Speak clearly and wait for the AI response</li>
          <li>• The AI will respond with both text and voice</li>
          <li>• Make sure you have a valid OpenAI API key in your .env file</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceChatbot; 