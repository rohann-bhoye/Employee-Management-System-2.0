import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // For extracting emp_id from URL
import axios from 'axios';

const UserRegistration = () => {
    const navigate=useNavigate();
  const { empId } = useParams(); // Extract emp_id from URL
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    password: '',
    isAdmin: false,
    emp_id: empId, // Pre-fill empId from params
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/signup', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('User registered successfully:', response.data);
      navigate(`/admindashboard`);
      // Redirect to some success or dashboard page if needed
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Mobile Number</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Admin</Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              name="isAdmin"
              checked={userData.isAdmin}
              onChange={(e) => setUserData({ ...userData, isAdmin: e.target.checked })}
              label="Is Admin"
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register User
        </Button>
      </Form>
    </div>
  );
};

export default UserRegistration;
