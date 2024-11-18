// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <h2 style={styles.logo}>EMS</h2>
        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.navItem}>Home</Link></li>
          <li><Link to="/" style={styles.navItem}>Contact Us</Link></li>
          
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '20px',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#ecf0f1',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
  },
  navItem: {
    color: '#ecf0f1',
    fontSize: '18px',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  navItemHover: {
    color: '#3498db',
  }
};

export default NavBar;
