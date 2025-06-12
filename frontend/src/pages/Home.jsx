import React from 'react';
import UrlForm from '../components/UrlForm';
import Navbar from '../components/Navbar';

const HomePage= () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-6">
          <h1 className="text-xl font-semibold text-center mb-4">Create a Short URL</h1>
          <UrlForm />
        </div>
      </div>
    </>
  );
};

export default HomePage;