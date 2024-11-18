import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // Import axios for API requests
import './ViewEmployeeView.css'; // Import your CSS for styling
import AdminNavBar from '../../components/AdminNavbar';
import AdminFooter from '../../components/AdminFooter';



const ViewEmployeeView = () => {
  const { empId } = useParams(); // Get employee ID from URL parameters
  const [employee, setEmployee] = useState(null); 
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employeeview/${empId}`); // Fetch employee details
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [empId]); // Fetch employee details on component mount

  if (!employee) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <AdminNavBar />
      <div className="employee-view">
        <h2>Employee Details</h2>
        <div className="employee-info">
          <p><strong>Employee ID:</strong> {employee.emp_id}</p>
          <p><strong>Full Name:</strong> {employee.emp_fullname}</p>
          <p><strong>Age:</strong> {employee.emp_age}</p>
          <p><strong>Gender:</strong> {employee.emp_gender}</p>
          <p><strong>Date of Birth:</strong> {employee.emp_dob}</p>
          <p><strong>Date of Joining:</strong> {employee.emp_doj}</p>
          <p><strong>Email:</strong> {employee.emp_mail}</p>
          <p><strong>Mobile Number:</strong> {employee.mobile_number}</p>
          <p><strong>Current Address:</strong> {employee.emp_currentadd}</p>
          <p><strong>Permanent Address:</strong> {employee.emp_permanentadd}</p>
          <p><strong>Department:</strong> {employee.emp_department}</p>
          <p><strong>Adhar No:</strong> {employee.adhar_no}</p>
          <p><strong>Account Number:</strong> {employee.acc_num}</p>
          <p><strong>IFSC:</strong> {employee.ifsc}</p>
        </div>
        <button className="btn" onClick={() => navigate(`/editemployee/${employee.emp_id}`)}>Edit</button>
      </div>
      <AdminFooter />
    </>
  );
};

export default ViewEmployeeView ;
