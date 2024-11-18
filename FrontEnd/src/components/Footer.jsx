// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>
        
        Follow us: 
        <a href="https://facebook.com" style={styles.socialLink}> Facebook</a> | 
        <a href="https://twitter.com" style={styles.socialLink}> Twitter</a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    position: 'fixed',  // Sticks to the bottom of the window
    bottom: '0',
    left: '0',
    boxSizing: 'border-box',  // Prevents any overflow
    
  },
  socialLink: {
    color: '#3498db',
    textDecoration: 'none',
    marginLeft: '5px',
    transition: 'color 0.3s',
  }
};

export default Footer;
