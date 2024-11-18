// src/pages/Login.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import './LoginPage.css'; // For custom styles
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');

    // Validate email or phone number format
    if (!data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !data.email.match(/^\d{10}$/)) {
      setErrorMessage('Invalid email or phone number format');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/user/login", data);
      const myData = response.data; 
      let role = myData.admin ? 'admin' : 'employee';
      console.log(myData);

      // Store token in local storage
      if (myData.token) {
        localStorage.setItem('token', myData.token);
      }

      // Redirect based on role and include employee ID for profile page
      if (role === 'admin') {
        navigate(`/adminDashboard`);
      } else {
        // Assuming myData has employeeId field
        navigate(`/profile/${myData.id}`); // Redirect to employee profile page
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error('Login error:', error);
    const message = error.response?.data?.message || 'Login failed. Please try again.';
    setErrorMessage(message);
  };

  return (
    <>
      <NavBar />
      <Container className="login-container">
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email or Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email or phone number"
                  {...register('email', { required: 'Email or Phone Number is required' })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  {...register('password', { required: 'Password is required' })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
