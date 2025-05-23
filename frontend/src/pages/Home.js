import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to DevConnector Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with developers, showcase your projects, and grow your network
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-3 rounded-md border border-indigo-600 hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <p className="text-gray-600">
              Find and connect with developers who share your interests and skills
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Showcase</h3>
            <p className="text-gray-600">
              Share your projects and get feedback from the community
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Collaborate</h3>
            <p className="text-gray-600">
              Work together on projects and build something amazing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 