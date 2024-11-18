import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './AdminNavBar.css'; 

const AdminNavBar = () => {
  const navigate = useNavigate(); // React Router's useNavigate hook for redirection
  
  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login'); // Adjust the path based on your routing
  };

  return (
    <nav className="admin-navbar">
      <div className="nav-container">
        <h2 className="logo">EMS</h2>
        <ul className="nav-links">
          <li><Link to="/admindashboard" className="nav-item">Home</Link></li>
          <li><Link to="/manageemployee" className="nav-item">Manage Employees</Link></li>
          <li><Link to="/adminproject" className="nav-item">Project Employees</Link></li>
          <li><Link to="/admin-finance" className="nav-item">Finance View</Link></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;
