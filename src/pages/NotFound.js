import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-700 h-screen flex flex-col justify-center items-center">
      <div className="text-white text-6xl font-bold">404</div>
      <div className="text-white text-2xl font-semibold mb-4">Page Not Found</div>
      <p className="text-white text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link to={`/`}>
      <button className="mt-8 bg-white text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full font-semibold transition duration-300">
        Go Back to Home 
      </button>
      </Link>
    </div>
  );
};

export default NotFound;
