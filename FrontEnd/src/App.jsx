// src/App.js
import  { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import FinanceSection from "./pages/FinanceSection/FinanceSection";
import FinanceEditForm from "./pages/FinanceSection/FinanceEditForm"; // Import the Edit Form
import AdminFinanceView from "./pages/FinanceSection/AdminFinanceView"; // Import Admin Finance View


import "./App.css"; // Import global CSS

import EmployeeForm from "./pages/Employee/EditEmployee";

import ManageEmployee from "./pages/Employee/EmployeeDashBoard";

import Profile from "./pages/Profile";

import RegisterEmployee from "./pages/RegisterEmployee";
import AdminEditEmployeeForm from "./pages/adminsection/AdminEditEmployee";

import AdminProjectManagement from "./pages/ProjectDetails/AdminProjectManagement";
import Project from "./pages/ProjectDetails/ProjectForm";
import Viewemployee from "./pages/adminsection/Viewemployee";
import ProjectManagement from "./pages/ProjectDetails/AdminProjectManagement";
import UserRegistration from "./pages/adminsection/RegisterUser";




const App = () => {
  // State to manage finance details for a single employee
  const [financeDetails, setFinanceDetails] = useState({
    panCard: "ABCDE1234F",
    aadharCard: "123456789012",
    bankName: "XYZ Bank",
    branch: "Main Branch",
    ifscCode: "XYZB0123456",
    ctcBreakup: "Base: 5L, HRA: 2L, Bonus: 1L",
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle between viewing and editing
  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing confirmation popup

  // Function to handle editing finance details
  const handleEditClick = () => setIsEditing(true);

  const handleSave = (updatedDetails) => {
    setFinanceDetails(updatedDetails);
    setIsEditing(false);
    setShowConfirmation(true); // Show confirmation popup after saving
  };

  const handleCancel = () => setIsEditing(false); // Cancel editing

  const closeConfirmation = () => setShowConfirmation(false); // Close the popup

  const employeesData = [
  {
    id: 1,
    name: "John Doe",
    department: "IT", // Added Department
    finance: {
      panCard: "ABCDE1234F",
      aadharCard: "123456789012",
      bankName: "Bank of Example",
      branch: "Example Branch",
      ifscCode: "EXAM1234567",
      ctcBreakup: "₹60,000",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "HR", // Added Department
    finance: {
      panCard: "FGHIJ5678K",
      aadharCard: "987654321012",
      bankName: "Example Bank",
      branch: "Main Branch",
      ifscCode: "EXAM7654321",
      ctcBreakup: "₹70,000",
    },
  },
  // Add more employees as needed
];



  return (
    <Router>
      <div>
        <Routes>
          {/* Routes for different pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/user-registration/:emp_id" element={<UserRegistration />} />

          <Route path="/project/:id" element={<Project />} />
          
          <Route path="/EmployeeForm/:emp_id" element={<EmployeeForm />} />
         
          
          <Route path="/manageemployee" element={<ManageEmployee />} />
          <Route path="/profile/:id" element={<Profile />} />
      
          <Route path="/addemployee" element={<RegisterEmployee />} />


          <Route path="/editemployee/:emp_id" element={<AdminEditEmployeeForm />} />

          {/* <Route path="/viewemployee" element={<ViewEmployeeView />} /> */}


          
          <Route path="/adminproject" element={<AdminProjectManagement />} />
          <Route path="/viewemployee/:id" element={<Viewemployee />} />

          {/* Finance Routes */}
          <Route
          path="/finance/:id"
          element={
            !isEditing ? (
              <FinanceSection
                financeDetails={financeDetails}
                onEditClick={handleEditClick}
              />
            ) : (
              <FinanceEditForm
                financeDetails={financeDetails}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )
          }
        />

        {/* Admin Finance View Route */}
        <Route
          path="/admin-finance"
          element={<AdminFinanceView employees={employeesData} financeDetails={financeDetails} />}
        />
      </Routes>

        {/* Inline Confirmation Popup without a separate file */}
        {showConfirmation && (
          <div className="popup-overlay" onClick={closeConfirmation}>
            <div className="popup-box" onClick={(e) => e.stopPropagation()}>
              <h3>Confirmation</h3>
              <p>Changes saved successfully!</p>
              <button className="close-button" onClick={closeConfirmation}>
                OK
                
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
