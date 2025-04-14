// components/LoadingIndicator.jsx
import React from 'react';
import './loadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator-overlay">
      <div className="loading-indicator-wrapper">
        <div className="loading-indicator-orbit" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
