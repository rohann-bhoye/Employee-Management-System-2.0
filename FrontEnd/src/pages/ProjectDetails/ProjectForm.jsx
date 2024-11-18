import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ProjectForm.css";
import EmployeeNavBar from "../../components/EmployeeNavBar";
import EmployeeFooter from "../../components/EmployeeFooter";
import axios from "axios"; 

const ProjectHistory = ({ empId }) => {
  const [projectList, setProjectList] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects/employee/${empId}`);
        setProjectList(response.data); 
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectHistory();
  }, [empId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projectList.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="project-history">
      <div className="button-group">
        <Link to={`/profile/${empId}`}>
          <button className="profile-edit-btn">Home</button>
        </Link>
        <Link to={`/finance/${empId}`}>
          <button className="profile-edit-btn">Finance Details</button>
        </Link>
      </div>
      <h2>Project History</h2>
      {currentItems.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Project Code</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Manager Email</th>
                <th>Current Project</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((project) => (
                <tr key={project.id}>
                  <td>{project.clientName}</td>
                  <td>{project.projectCode}</td>
                  <td>{new Date(project.startDate).toLocaleDateString()}</td>
                  <td>
                    {project.currentProject ? "Ongoing" : new Date(project.endDate).toLocaleDateString()}
                  </td>
                  <td>{project.managerEmail}</td>
                  <td>{project.currentProject ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No project history available.</p>
      )}
    </div>
  );
};

const Project = () => {
  const { id } = useParams(); 

  return (
    <>
      <EmployeeNavBar />
      <div className="app-container">
        <ProjectHistory empId={id} />
      </div>
      <EmployeeFooter />
    </>
  );
};

export default Project;
