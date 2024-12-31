import React from 'react';
import { useNavigate } from 'react-router-dom';
import pageNotFoundImage from '../../assets/PageNotFound.png'; 

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <img
        src={pageNotFoundImage}
        alt="Page Not Found"
        className="img-fluid mb-4"
        style={{ maxWidth: '500px' }}
      />
      <h1 className="display-4 text-danger mb-3">Page Not Found</h1>
      <p className="text-muted mb-4">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <button className="btn btn-primary btn-lg" onClick={handleGoHome}>
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
