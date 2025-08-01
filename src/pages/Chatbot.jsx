import React from 'react';
import VoiceChatbot from '../components/VoiceChatbot';

const Chatbot = () => {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI <span className="text-blue-600">Voice Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of conversation with our AI-powered voice assistant. 
            Speak naturally and get intelligent responses in real-time.
          </p>
        </div>

        {/* Chatbot Component */}
        <VoiceChatbot />

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Recognition</h3>
              <p className="text-gray-600">
                Advanced speech-to-text technology for accurate voice input.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
              <p className="text-gray-600">
                Powered by OpenAI's GPT model for intelligent conversations.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Text-to-Speech</h3>
              <p className="text-gray-600">
                Natural voice responses for a complete conversational experience.
              </p>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Instructions</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get OpenAI API Key</h3>
                <p className="text-gray-600">Sign up at <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a> and create an API key.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create Environment File</h3>
                <p className="text-gray-600">Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file in your project root and add:</p>
                <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
                  VITE_OPENAI_API_KEY=your_api_key_here
                </pre>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Restart Development Server</h3>
                <p className="text-gray-600">Restart your development server to load the environment variables.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start Talking</h3>
                <p className="text-gray-600">Click the microphone button and start your conversation!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 