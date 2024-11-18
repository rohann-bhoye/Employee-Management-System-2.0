import React, { useState, useEffect } from "react";
import "./EmployeeDashboard.css";
import axios from "axios";

import AdminNavBar from "../../components/AdminNavbar";
import AdminFooter from "../../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const ManageEmployee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // Number of employees per page

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/get"); // Update the endpoint to your actual API URL
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Search function (search by name or ID)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterAndSearchEmployees(e.target.value, filterDepartment);
  };

  // Filter function (filter by department)
  const handleFilter = (e) => {
    setFilterDepartment(e.target.value);
    filterAndSearchEmployees(searchTerm, e.target.value);
  };

  // Filter and search employees
  const filterAndSearchEmployees = (searchTerm, filterDepartment) => {
    let filtered = employees.filter(
      (employee) =>
        (employee.emp_fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          employee.emp_id.toString().includes(searchTerm)) &&
        (!filterDepartment || employee.emp_department === filterDepartment)
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  // Get current employees for the page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Pagination handlers
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Delete employee

  const handleDelete = async (emp_id) => {
    if (
      window.confirm(`Are you sure you want to delete employee ID ${emp_id}?`)
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/delete/${emp_id}`
        );

        if (response.status === 200) {
          // Remove the deleted employee from the frontend
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.emp_id !== emp_id)
          );
          setFilteredEmployees((prevFiltered) =>
            prevFiltered.filter((employee) => employee.emp_id !== emp_id)
          );
          alert("Employee deleted successfully.");
        } else {
          alert("Failed to delete employee.");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee.");
      }
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="employeedashboard">
        <h2>Manage Employees Section</h2>
        <div className="addempbtn">
        <button className="add-employee-btn"><a href="/addemployee"> Add Employee </a></button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        {/* Filter by Department */}
        <select
          value={filterDepartment}
          onChange={handleFilter}
          className="filter-select"
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="IT">IT</option>
          <option value="Engineering">Engineering</option>
          <option value="Operations">Operations</option>
        </select>

        {/* Employee Table */}
        <table className="employees-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.emp_id}>
                <td>{employee.emp_id}</td>
                <td>{employee.emp_fullname}</td>
                <td>{employee.emp_department}</td>
                <td>{employee.emp_mail}</td>
                <td className="editbtn">
                  <button
                    className="view-employee-btn"
                    onClick={() => navigate(`/viewemployee/${employee.emp_id}`)}
                  >
                    View
                  </button>
                  <button
                    className="edit-employee-btn"
                    onClick={() => navigate(`/EmployeeForm/${employee.emp_id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-employee-btn"
                    onClick={() => handleDelete(employee.emp_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="pagination-btn prev-btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="pagination-btn next-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageEmployee;
