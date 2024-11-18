import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProjectManagement.css";
import AdminFooter from "../../components/AdminFooter";
import AdminNavBar from "../../components/AdminNavbar";

const AdminProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]); // State to store list of employees
  const [searchTerm, setSearchTerm] = useState(""); // State for project history search
  const [newProject, setNewProject] = useState({
    empId: "",
    projectCode: "",
    startDate: "",
    endDate: "",
    clientName: "",
    managerEmail: "",
    isCurrentProject: false,
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Fetch projects from backend API
useEffect(() => {
  axios
    .get(`http://localhost:8000/api/projects/getAllProjects`)
    .then((response) => {
      console.log("Fetched projects: ", response.data); // Log the response
      setProjects(response.data);
    })
    .catch((error) => {
      console.error("Error fetching project data: ", error);
    });
}, []);


const handleSubmit = (e) => {
  e.preventDefault();
  const confirmSubmit = window.confirm("Are you sure you want to add this project?");
  if (!confirmSubmit) return;

  const endDate = newProject.endDate || "Ongoing";
  const isCurrentProject = endDate === "Ongoing";
  const project = { ...newProject, endDate, isCurrentProject };

  console.log("Project to be added:", project); // Log the project to be added

  axios
    .post(`http://localhost:8000/api/projects/addProject`, project)
    .then((response) => {
      console.log("Project added:", response.data); // Check the added project
      setProjects([...projects, response.data]);
    })
    .catch((error) => {
      console.error("Error adding project: ", error);
    });
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  // Function to handle the project additio

  // Filter employees for the dropdown based on employee name or ID
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.emp_fullname.toLowerCase().includes(newProject.empId.toLowerCase()) ||
      employee.emp_id.toString().includes(newProject.empId)
  );

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.empId.toString().includes(searchTerm) ||
      project.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current projects to display based on pagination
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <>
      <AdminNavBar />
      <div className="admin-project-container">
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <label>Employee ID:</label>
            <input
              type="text"
              placeholder="Search Employee"
              value={newProject.empId}
              onChange={handleChange}
              name="empId"
              autoComplete="off"
            />
            
          <label>Project Code:</label>
          <input
            type="text"
            name="projectCode"
            value={newProject.projectCode}
            onChange={handleChange}
            required
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={newProject.startDate}
            onChange={handleChange}
            required
          />

          <label>End Date (Leave blank for Ongoing):</label>
          <input
            type="date"
            name="endDate"
            value={newProject.endDate}
            onChange={handleChange}
          />

          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={newProject.clientName}
            onChange={handleChange}
            required
          />

          <label>Manager Email:</label>
          <input
            type="email"
            name="managerEmail"
            value={newProject.managerEmail}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-submit">
            Add Project
          </button>
        </form>

        <h2>Project History</h2>
        <input
          type="text"
          placeholder="Search by Employee ID, Project Code, or Client Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="project-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Project Code</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Client Name</th>
              <th>Manager Email</th>
              <th>Is Current Project</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project) => (
  <tr key={project.id}> {/* Use a unique identifier */}
    <td>{project.empId}</td>
    <td>{project.projectCode}</td>
    <td>{project.startDate}</td>
    <td>{project.endDate}</td>
    <td>{project.clientName}</td>
    <td>{project.managerEmail}</td>
    <td>{project.isCurrentProject ? "Yes" : "No"}</td>
  </tr>
))}

          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminProjectManagement;
