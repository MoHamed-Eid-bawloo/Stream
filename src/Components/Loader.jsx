import React from 'react';
import loader from '../assets/images/loader.gif'; // Adjust the path as necessary

const Loader = ({ isLoading }) => {
  if (!isLoading) return null; // Don't render anything if not loading

  return (
    <div className="loader simple-loader">
      <div className="loader-body">
        <img src={loader} alt="Loading..." className="img-fluid" width="300" />
      </div>
    </div>
  );
};

export default Loader;