import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3>Welcome to OA Platform</h3>
            </div>
            <div className="card-body">
              <h4>Hello, {user?.name}!</h4>
              <p>You are logged in as: {user?.role}</p>
              <p>Your dashboard is ready. More features coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;