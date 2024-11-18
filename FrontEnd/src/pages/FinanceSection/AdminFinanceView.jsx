import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminFinanceView.css";
import AdminFooter from "../../components/AdminFooter";
import AdminNavBar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";

const AdminFinanceView = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [financeDetails, setFinanceDetails] = useState(null);

  // Fetch all employees from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/get")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data: ", error);
      });
  }, []);

  const showDetails = (employee) => {
    setSelectedEmployee(employee);

    // Fetch finance details for the selected employee
    axios
      .get(`http://localhost:8000/employee/${employee.emp_id}`)
      .then((response) => {
        setFinanceDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching finance details: ", error);
      });
  };

  const closeDetails = () => {
    setSelectedEmployee(null);
    setFinanceDetails(null);
  };

  return (
    <>
    <AdminNavBar/>
    <div className="admin-finance-container">
      <h2 id="admin-finance-header">Finance Section</h2>
      <table id="finance-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Finance Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.emp_fullname}</td>
              <td>
                <button
                  id={`finance-btn-${employee.emp_id}`}
                  className="finance-details-btn"
                  onClick={() => showDetails(employee)}
                  >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && financeDetails && (
        <div id="finance-modal" className="modal-overlay">
          <div id="finance-modal-content" className="modal-content">
            <h3 id="finance-modal-header">
              Finance Details for {selectedEmployee.emp_fullname}
            </h3>
            <ul id="finance-details-list">
              <li>PAN Card: {financeDetails.pan_no}</li>
              <li>Bank Name: {financeDetails.bank_name}</li>
              <li>Branch Name: {financeDetails.branch_name}</li>
              <li>IFSC Code: {financeDetails.ifsc}</li>
              <li>Allowances: ₹{financeDetails.emp_Allowances}</li>
              <li>Deductions: ₹{financeDetails.leave_deductions}</li>
              <li>Annual Salary: ₹{financeDetails.emp_ctc}</li>
            </ul>
            <button
              id="close-btn"
              className="close-btn"
              onClick={closeDetails}
              >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
      </>
  );
};

export default AdminFinanceView;
