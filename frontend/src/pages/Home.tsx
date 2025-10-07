import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Online Assessment Platform</h1>
        <p className="lead">A comprehensive platform for creating and taking assessments</p>
        <hr className="my-4" />
        <div className="d-flex justify-content-center">
          <Link to="/login" className="btn btn-primary btn-lg mx-2">Login</Link>
          <Link to="/register" className="btn btn-success btn-lg mx-2">Register</Link>
          <Link to="/admin/login" className="btn btn-dark btn-lg mx-2">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;