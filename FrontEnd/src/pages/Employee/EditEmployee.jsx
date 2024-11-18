import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditEmployee.css";
import EmployeeFooter from "../../components/EmployeeFooter";
import EmployeeNavBar from "../../components/EmployeeNavBar";
import { useParams } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavbar";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: null,
    age: "",
    gender: "",
    currentAddress: "",
    permanentAddress: "",
    companyEmail: "",
    employeeEmail: "", // Added employeeEmail for read-only view
    panCard: "",
    aadharCard: "",
    bankAccountNumber: "",
    ifscCode: "",
    dateOfJoining: null,
  });

  const { emp_id } = useParams();

  useEffect(() => {
    fetchEmployeeData(emp_id);
  }, [emp_id]);

  const fetchEmployeeData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/employee/${id}`); // Replace with actual API endpoint
      const data = await response.json();

      setFormData({
        fullName: data.emp_fullname,
        dateOfBirth: new Date(data.emp_DOB),
        age: data.emp_age,
        gender: data.emp_gender,
        departname:data.emp_department,
        currentAddress: data.emp_currentadd,
        permanentAddress: data.emp_permanentadd,
        companyEmail: data.emp_mail, // Assuming this is from your API
        employeeEmail: data.emp_email, // Added employee email from API
        panCard: data.pan_no,
        aadharCard: data.adhar_no,
        bankAccountNumber: data.acc_num,
        ifscCode: data.ifsc,
        dateOfJoining: new Date(data.emp_DOJ),
      });
    } catch (error) {
      console.error("Error fetching employee data: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
    if (field === "dateOfBirth") {
      calculateAge(date);
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    setFormData((prevData) => ({ ...prevData, age: age }));
  };

  const validateForm = () => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const ifscPattern = /^[A-Z]{4}0[0-9]{6}$/;

    if (!panPattern.test(formData.panCard)) {
      alert("Invalid PAN card number.");
      return false;
    }
    if (!ifscPattern.test(formData.ifscCode)) {
      alert("Invalid IFSC code.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mappedData = {
      emp_fullname: formData.fullName,
      emp_DOB: formData.dateOfBirth ? formData.dateOfBirth.getTime() : null,
      emp_age: formData.age,
      emp_gender: formData.gender, 
      emp_department: formData.department,
      emp_currentadd: formData.currentAddress,
      emp_permanentadd: formData.permanentAddress,
      emp_mail: formData.companyEmail,
      adhar_no: formData.aadharCard,
      acc_num: formData.bankAccountNumber,
      ifsc: formData.ifscCode,
      pan_no: formData.panCard,
      emp_DOJ: formData.dateOfJoining ? formData.dateOfJoining.getTime() : null,
      emp_email: formData.employeeEmail, // If needed for the backend
    };

    if (validateForm()) {
      try {
        const response = await fetch(
          `http://localhost:8000/employeeEditSave/${emp_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mappedData),
          }
        );

        if (response.ok) {
          alert("Employee data updated successfully!");
        } else {
          const errorData = await response.json();
          alert(`Error updating employee: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error updating employee:", error);
        alert("An error occurred while updating employee data.");
      }
    }
  };

  return (
    <>
      <AdminNavBar />
      <Form onSubmit={handleSubmit}>
        <h2>Personal Details</h2>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Full Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Date of Birth
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => handleDateChange(date, "dateOfBirth")}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              maxDate={new Date()}
              className="form-control"
              placeholderText="Select your date of birth"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Age
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="age" value={formData.age} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              {/* Add gender options */}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Department Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="department"
              value={formData.departname}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="hr">HR</option>
              <option value="opration">Opration</option>
              <option value="engineering">Engineering</option>
              
            </Form.Control>
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Current Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Permanent Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <h2>Professional Details</h2>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Employee Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="employeeEmail"
              value={formData.employeeEmail}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Company Email
          </Form.Label>
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            PAN Card
          </Form.Label>
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
          <Form.Label column sm={2}>
            Aadhar Card
          </Form.Label>
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Bank Account Number
          </Form.Label>
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            IFSC Code
          </Form.Label>
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Date of Joining
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={formData.dateOfJoining}
              onChange={(date) => handleDateChange(date, "dateOfJoining")}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select your date of joining"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </Form.Group>
      </Form>
      <EmployeeFooter />
    </>
  );
};

export default EmployeeForm;
