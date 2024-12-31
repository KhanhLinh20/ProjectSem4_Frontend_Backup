import React from 'react';
import '../Loading/Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-shadow"></div>
        <div className="loading-shadow"></div>
        <div className="loading-shadow"></div>
      </div>
    </div>
  );
};

export default Loading;
