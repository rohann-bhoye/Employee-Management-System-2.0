import React from 'react';
import './AdminFooter.css'; 

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <p className="footer-text">&copy; 2024 Your Company. All rights reserved.</p>
      <p className="footer-text">
        Follow us: 
        <a href="https://facebook.com" className="social-link"> Facebook</a> | 
        <a href="https://twitter.com" className="social-link"> Twitter</a>
      </p>
    </footer>
  );
};

export default AdminFooter;
