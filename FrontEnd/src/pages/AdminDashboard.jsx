import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 
import axios from 'axios'; 
import './AdminDashboard.css'; 
import AdminNavBar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [recentEmployees, setRecentEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; 

  useEffect(() => {
    // Fetch employee data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get');
        setRecentEmployees(response.data); 
        setTotalEmployees(response.data.length); 
        setTotalDepartments(5);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []); 

  const handleDelete = async (emp_id) => {
    if (window.confirm(`Are you sure you want to delete employee ID ${emp_id}?`)) {
      try {
        const response = await axios.delete(`http://localhost:8000/delete/${emp_id}`);

        if (response.status === 200) {
          // Remove the deleted employee from the frontend
          setRecentEmployees((prevEmployees) => 
            prevEmployees.filter(employee => employee.emp_id !== emp_id)
          );
          alert('Employee deleted successfully.');
        } else {
          alert('Failed to delete employee.');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee.');
      }
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(recentEmployees.length / employeesPerPage);

  // Get current employees to display on the page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = recentEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text('Employee Report', 14, 22);

    // Add Subtitle
    doc.setFontSize(12);
    doc.text(`Total Employees: ${totalEmployees}`, 14, 30);
    doc.text(`Total Departments: ${totalDepartments}`, 14, 35);

    // Add Table of Employees
    doc.autoTable({
      head: [['Employee ID', 'Name', 'Department']],
      body: recentEmployees.map(emp => [
        emp.emp_id,
        emp.emp_fullname,
        emp.emp_department,
      ]),
      startY: 45,
    });

    // Save the PDF
    doc.save('Employee_Report.pdf');
  };

  return (
    <>
      <AdminNavBar />

      <div className="admin-dashboard">
        <h2 className="Title">Admin Dashboard</h2>

        {/* Quick Stats Section */}
        <div className="dashboard-statistics">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
          <div className="stat-card">
            <h3>Total Departments</h3>
            <p>{totalDepartments}</p>
          </div>
        </div>

        {/* Employee Management Section */}
        <div className="employee-management">
          <h3>Recently Added Employees</h3>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.emp_id}>
                  <td>{employee.emp_id}</td>
                  <td>{employee.emp_fullname}</td>
                  <td>{employee.emp_department}</td>
                  <td className="Actionbutton">
                    <button className="btn-edit" onClick={() => navigate(`/EmployeeForm/${employee.emp_id}`)}>Edit</button>
                    <button className="btn-view" onClick={() => navigate(`/viewemployee/${employee.emp_id}`)}>View</button>
                    <button className='btn-delete' onClick={() => handleDelete(employee.emp_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button className="btn-pagination" onClick={handlePreviousPage} disabled={currentPage === 1}>
              ← Previous
            </button>
            <span className="page-number">{currentPage}</span>
            <button className="btn-pagination" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next →
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
        <button className="btn-add-employee" onClick={() => navigate('/addemployee')}>Add New Employee</button>
        <button className="btn-view-all" onClick={() => navigate('/manageemployee')}>View All Employees</button>
        </div>
      </div>

      <AdminFooter />
    </>
  );
};

export default AdminDashboard; 
