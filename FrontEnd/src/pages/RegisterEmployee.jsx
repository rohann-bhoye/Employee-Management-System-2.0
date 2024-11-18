import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import AdminFooter from '../components/AdminFooter';
import AdminNavBar from '../components/AdminNavbar';
import axios from 'axios';
import './RegisterEmployee.css';
import { useNavigate } from 'react-router-dom';

const RegisterEmployee = () => {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    emp_fullname: '',
    emp_DOB: '', // Using date as string in 'YYYY-MM-DD' format
    emp_gender: '',
    emp_age: '',
    emp_currentadd: '',
    emp_permanentadd: '',
    emp_mail: '',
    emp_department: '',
    emp_ctc: '',
    emp_DOJ: '', // 'YYYY-MM-DD' format
    adhar_no: '',
    acc_num: '',
    IFSC: '',
    pan_no: '',
    emp_MonthlySalary: '',
    emp_pf: '',
    emp_ESI: '',
    leave_deductions: '',
    emp_Allowances: '',
    bank_name: '',
    branch_name: '',
  });

  const [errors, setErrors] = useState({});

  

  const handleChange = (e) => {

    

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });



    // Auto-calculate CTC based on monthly salary and deductions
    if (['emp_MonthlySalary', 'leave_deductions', 'emp_Allowances'].includes(name)) {
      const monthlySalary = parseFloat(formData.emp_MonthlySalary || 0);
      const deductions = parseFloat(formData.leave_deductions || 0);
      const allowances = parseFloat(formData.emp_Allowances || 0);

      const annualCTC = (monthlySalary - deductions + allowances) * 12;
      setFormData((prevData) => ({
        ...prevData,
        emp_ctc: annualCTC.toFixed(2),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharPattern = /^\d{12}$/;
    const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!formData.emp_fullname) newErrors.emp_fullname = 'Full Name is required';
    if (!formData.emp_mail) newErrors.emp_mail = 'Email is required';
    if (!formData.emp_DOB) newErrors.emp_DOB = 'Date of Birth is required';
    if (!formData.acc_num) newErrors.acc_num = 'Bank Account Number is required';
    if (!formData.IFSC) newErrors.IFSC = 'IFSC Code is required';
    else if (!ifscPattern.test(formData.IFSC)) newErrors.IFSC = 'Invalid IFSC format';
    if (!formData.pan_no) newErrors.pan_no = 'PAN Card is required';
    else if (!panCardPattern.test(formData.pan_no)) newErrors.pan_no = 'Invalid PAN format';
    if (!formData.adhar_no) newErrors.adhar_no = 'Aadhar is required';
    else if (!aadharPattern.test(formData.adhar_no)) newErrors.adhar_no = 'Aadhar must be 12 digits';
    if (!formData.emp_MonthlySalary) newErrors.emp_MonthlySalary = 'Monthly Salary is required';
    if (!formData.leave_deductions) newErrors.leave_deductions = 'Leave Deductions are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    // Format emp_DOB and emp_DOJ to backend-expected format
    const formattedData = {
      ...formData,
      emp_DOB: formData.emp_DOB.replace(/-/g, ''), // Convert 'YYYY-MM-DD' to 'YYYYMMDD'
      emp_DOJ: new Date(formData.emp_DOJ).getTime(), // Convert to timestamp
      emp_ctc: parseFloat(formData.emp_ctc),
      emp_MonthlySalary: parseFloat(formData.emp_MonthlySalary),
      emp_age: parseInt(formData.emp_age),
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/create',
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Employee created successfully:', response.data);
      const emp_id = response.data.emp_id; // Assuming backend returns emp_id

      // Navigate to the User Registration form with emp_id in URL
      navigate(`/user-registration/${emp_id}`);
    } catch (error) {
      console.error('Error registering employee:', error);
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="register-employee">
        <h2>Register New Employee</h2>
        <Form onSubmit={handleSubmit}>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Full Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="emp_fullname"
                value={formData.emp_fullname}
                onChange={handleChange}
                required
              />
              {errors.emp_fullname && <span className="error">{errors.emp_fullname}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Date of Birth</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                name="emp_DOB"
                value={formData.emp_DOB}
                onChange={handleChange}
                required
              />
              {errors.emp_DOB && <span className="error">{errors.emp_DOB}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Gender</Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="emp_gender"
                value={formData.emp_gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Age</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="emp_age"
                value={formData.emp_age}
                onChange={handleChange}
                required
              />
              {errors.emp_age && <span className="error">{errors.emp_age}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Current Address</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="emp_currentadd"
                value={formData.emp_currentadd}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Permanent Address</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="emp_permanentadd"
                value={formData.emp_permanentadd}
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
                name="emp_mail"
                value={formData.emp_mail}
                onChange={handleChange}
                required
              />
              {errors.emp_mail && <span className="error">{errors.emp_mail}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Department</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="emp_department"
                value={formData.emp_department}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Date of Joining</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                name="emp_DOJ"
                value={formData.emp_DOJ}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Monthly Salary</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="emp_MonthlySalary"
                value={formData.emp_MonthlySalary}
                onChange={handleChange}
                required
              />
              {errors.emp_MonthlySalary && <span className="error">{errors.emp_MonthlySalary}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Leave Deductions</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="leave_deductions"
                value={formData.leave_deductions}
                onChange={handleChange}
                required
              />
              {errors.leave_deductions && <span className="error">{errors.leave_deductions}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Allowances</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="emp_Allowances"
                value={formData.emp_Allowances}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>CTC</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="emp_ctc"
                value={formData.emp_ctc}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Aadhar Number</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="adhar_no"
                value={formData.adhar_no}
                onChange={handleChange}
                required
              />
              {errors.adhar_no && <span className="error">{errors.adhar_no}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Bank Account Number</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="acc_num"
                value={formData.acc_num}
                onChange={handleChange}
                required
              />
              {errors.acc_num && <span className="error">{errors.acc_num}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>IFSC Code</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="IFSC"
                value={formData.IFSC}
                onChange={handleChange}
                required
              />
              {errors.IFSC && <span className="error">{errors.IFSC}</span>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>PAN Card</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="pan_no"
                value={formData.pan_no}
                onChange={handleChange}
                required
              />
              {errors.pan_no && <span className="error">{errors.pan_no}</span>}
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register Employee
          </Button>
        </Form>
      </div>
      <AdminFooter />
    </>
  );
};

export default RegisterEmployee;
