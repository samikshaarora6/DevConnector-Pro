import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">DevConnector Pro</h2>
            <p className="text-gray-400">Connect with developers worldwide</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DevConnector Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 