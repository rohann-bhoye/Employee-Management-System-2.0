// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const Dashboard = () => {
  return (
    <>
    <NavBar/>
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Dashboard</h1>
      <p style={styles.subHeading}>Please choose your login option:</p>
      <div style={styles.links}>
        <Link to="/login" style={styles.linkButton}>Employer Login</Link>
        <Link to="/login" style={styles.linkButton}>Employee Login</Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '264px',
    padding: '20px',
    marginBottom:'129px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subHeading: {
    fontSize: '18px',
    color: '#7f8c8d',
    marginBottom: '40px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    
  },
  linkButton: {
    padding: '15px 30px',
    backgroundColor: '#3498db',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  linkButtonHover: {
    backgroundColor: '#2980b9',
  }
};

export default Dashboard;
