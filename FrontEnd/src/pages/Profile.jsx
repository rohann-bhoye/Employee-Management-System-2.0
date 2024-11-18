import React, { useEffect, useState } from 'react';
import './Profile.css';
import EmployeeFooter from '../components/EmployeeFooter';
import EmployeeNavBar from '../components/EmployeeNavBar';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const { id } = useParams(); // Destructure to get employee ID

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/employee/${id}`);
                setEmployeeData(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployeeData();
    }, [id]);

    if (!employeeData) {
        return <p>Loading...</p>;
    }

    const officeDetails = {
        officePhone: "+1 234 567 892",
        officeAddress: "789 Corporate Blvd",
        reportingManager: "Jane Smith",
        hrName: "Robert Brown",
    };

    return (
        <>
            <EmployeeNavBar />
            <div className="profile-container">
              <div className='btnnav'>
                
                <Link to={`/profile/${employeeData.emp_id}`}>
                    <button className="profile-edit-btn">Home</button>
                </Link>
                <Link to={`/project/${employeeData.emp_id}`}>
                    <button className="profile-edit-btn">Project Details</button>
                </Link>
                <Link to={`/finance/${employeeData.emp_id}`}>
                    <button className="profile-edit-btn">Salary & Payslip</button>
                </Link>
              </div>
                <h2>Employee Profile</h2>
                <div className="profile-box">
                    <p><strong className="profile-item">Full Name:</strong> {employeeData.emp_fullname}</p>
                    <p><strong className="profile-item">Date of Birth:</strong> {employeeData.emp_DOB}</p>
                    <p><strong className="profile-item">Gender:</strong> {employeeData.emp_gender}</p>
                    <p><strong className="profile-item">Age:</strong> {employeeData.emp_age}</p>
                    <p><strong className="profile-item">Current Address:</strong> {employeeData.emp_currentadd}</p>
                    <p><strong className="profile-item">Permanent Address:</strong> {employeeData.emp_permanentadd}</p>
                    <p><strong className="profile-item">Mobile:</strong> {employeeData.mobile_number || "N/A"}</p>
                    <p><strong className="profile-item">Personal Email:</strong> {employeeData.emp_mail}</p>
                    <p><strong className="profile-item">Department:</strong> {employeeData.emp_department}</p>
                    <p><strong className="profile-item">CTC:</strong> {employeeData.emp_ctc}</p>
                    <p><strong className="profile-item">Joining Date:</strong> {employeeData.emp_DOJ}</p>
                    <p><strong className="profile-item">Aadhar Number:</strong> {employeeData.adhar_no}</p>
                    <p><strong className="profile-item">PAN Number:</strong> {employeeData.pan_no}</p>
                    <p><strong className="profile-item">Bank Account Number:</strong> {employeeData.acc_num}</p>
                    <p><strong className="profile-item">IFSC Code:</strong> {employeeData.ifsc}</p>

                    {/* Static office details */}
                    <p><strong className="profile-item">Office Phone:</strong> {officeDetails.officePhone}</p>
                    <p><strong className="profile-item">Office Address:</strong> {officeDetails.officeAddress}</p>
                    <p><strong className="profile-item">Reporting Manager:</strong> {officeDetails.reportingManager}</p>
                    <p><strong className="profile-item">HR Name:</strong> {officeDetails.hrName}</p>
                </div>
            </div>
            <EmployeeFooter />
        </>
    );
};

export default Profile;