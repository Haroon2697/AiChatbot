import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">MyApp</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are passionate about creating innovative solutions that make a difference 
            in people's lives. Our mission is to build technology that empowers and inspires.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, MyApp started as a small team with a big vision. We believed 
              that technology should be accessible, intuitive, and powerful. What began as a 
              simple idea has grown into a platform that serves thousands of users worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey has been marked by continuous innovation, user feedback, and an 
              unwavering commitment to excellence. We've learned that the best products are 
              built through collaboration, iteration, and a deep understanding of user needs.
            </p>
            <p className="text-gray-600">
              Today, we continue to push boundaries and explore new possibilities, always 
              keeping our users at the heart of everything we do.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Innovation</h4>
                  <p className="text-gray-600 text-sm">Constantly pushing boundaries and exploring new possibilities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">User-Centric</h4>
                  <p className="text-gray-600 text-sm">Every decision we make is guided by user needs and feedback.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality</h4>
                  <p className="text-gray-600 text-sm">We never compromise on quality, from code to customer experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're a diverse team of passionate individuals working together to create 
            amazing experiences for our users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">JD</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
            <p className="text-blue-600 mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              Visionary leader with 10+ years of experience in technology and innovation.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">JS</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
            <p className="text-blue-600 mb-2">CTO</p>
            <p className="text-gray-600 text-sm">
              Technical expert passionate about building scalable and robust solutions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">MJ</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Johnson</h3>
            <p className="text-blue-600 mb-2">Lead Designer</p>
            <p className="text-gray-600 text-sm">
              Creative designer focused on creating beautiful and intuitive user experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 