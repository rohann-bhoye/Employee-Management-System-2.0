/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdminEditEmployee.css';
import EmployeeFooter from '../../components/EmployeeFooter';
import EmployeeNavBar from '../../components/EmployeeNavBar';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditEmployeeForm = () => {
  const { emp_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: null,
    age: '',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    department_name: '',
    companyEmail: '',
    panCard: '',
    aadharCard: '',
    bankAccountNumber: '',
    ifscCode: '',
    dateOfJoining: null,
  
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/employee/${emp_id}`)
      .then((response) => {
        const data = response.data;
        setFormData({
          fullName: data.emp_fullname,
          dateOfBirth: new Date(data.emp_DOB),
          age: data.emp_age,
          gender: data.emp_gender,
          currentAddress: data.emp_currentadd,
          permanentAddress: data.emp_permanentadd,
          department_name: data.emp_department,
          companyEmail: data.emp_mail,
          panCard: data.pan_no,
          aadharCard: data.adhar_no,
          bankAccountNumber: data.acc_num,
          ifscCode: data.ifsc,
          dateOfJoining: new Date(data.emp_DOJ),
        });
      })
      .catch((error) => console.error('Error fetching employee data:', error));
  }, [emp_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
    if (name === 'dateOfBirth') calculateAge(date);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (today < new Date(dob.setFullYear(today.getFullYear()))) {
      age--;
    }
    setFormData((prevData) => ({ ...prevData, age }));
  };

  const validateForm = () => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const ifscPattern = /^[A-Z]{4}0[0-9]{6}$/;

    if (!panPattern.test(formData.panCard)) {
      alert('Invalid PAN card number.');
      return false;
    }
    if (!ifscPattern.test(formData.ifscCode)) {
      alert('Invalid IFSC code.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:8000/employeeEditSave/${emp_id}`, formData) // Corrected line
        .then(() => {
          alert('Employee data updated successfully!');
          navigate('/admindashboard');
        })
        .catch((error) => {
          console.error('Error updating employee data:', error);
          setErrorMessage('Failed to update employee data.');
        });
    }
  };


  return (
    <>
      <EmployeeNavBar />
      <div className="employee-form-container">
        <Form onSubmit={handleSubmit}>
          <h2>Edit Employee Details</h2>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Full Name */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Full Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          {/* Gender */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Gender</Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Col>
          </Form.Group>

          {/* Date of Birth and Age */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Date of Birth</Form.Label>
            <Col sm={5}>
              <DatePicker
                selected={formData.dateOfBirth}
                onChange={(date) => handleDateChange('dateOfBirth', date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                maxDate={new Date()}
              />
            </Col>
            <Form.Label column sm={2}>Age</Form.Label>
            <Col sm={3}>
              <Form.Control type="number" value={formData.age} readOnly />
            </Col>
          </Form.Group>

          {/* Addresses */}
          <Form.Group className="mb-3">
            <Form.Label>Current Address</Form.Label>
            <Form.Control
              as="textarea"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Permanent Address</Form.Label>
            <Form.Control
              as="textarea"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* PAN and Aadhar */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>PAN Card</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Aadhar Card</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="aadharCard"
                value={formData.aadharCard}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          {/* Employee Code */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Department Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="department_name"
                value={formData.department_name}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Opration">Opration</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </Form.Control>
            </Col>
          </Form.Group>

          {/* Company Email */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Company Email</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          {/* Bank Account Number */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Bank Account Number</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          {/* IFSC Code */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>IFSC Code</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          {/* Date of Joining */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Date of Joining</Form.Label>
            <Col sm={10}>
              <DatePicker
                selected={formData.dateOfJoining}
                onChange={(date) => handleDateChange('dateOfJoining', date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                maxDate={new Date()}
              />
            </Col>
          </Form.Group>

         

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="submit-button">
            Update Employee
          </Button>
        </Form>
      </div>
      <EmployeeFooter />
    </>
  );
};

export default AdminEditEmployeeForm;  