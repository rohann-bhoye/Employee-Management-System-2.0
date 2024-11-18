import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageDepartment.css';
import AdminNavBar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import Footer from '../components/Footer';

const ManageDepartment = () => {
  const navigate = useNavigate();
  
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '', manager: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all departments on component load
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get'); // API call to get departments
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Handle adding new department
  const handleAddDepartment = async () => {
    if (newDepartment.name && newDepartment.manager) {
      try {
        const response = await axios.post('/api/departments', newDepartment); // API call to add department
        setDepartments([...departments, response.data]);
        setNewDepartment({ name: '', manager: '' });
      } catch (error) {
        console.error('Error adding department:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handle editing a department
  const handleEditDepartment = (id) => {
    const departmentToEdit = departments.find((dep) => dep.id === id);
    setNewDepartment({ name: departmentToEdit.name, manager: departmentToEdit.manager });
    setIsEditing(true);
    setEditId(id);
  };

  // Handle saving an edited department
  const handleSaveEdit = async () => {
    try {
      await axios.put(`/api/departments/${editId}`, newDepartment); // API call to update department
      setDepartments(
        departments.map((dep) =>
          dep.id === editId ? { ...dep, name: newDepartment.name, manager: newDepartment.manager } : dep
        )
      );
      setNewDepartment({ name: '', manager: '' });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  // Handle deleting a department
  const handleDeleteDepartment = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this department?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/departments/${id}`); // API call to delete department
        setDepartments(departments.filter((dep) => dep.id !== id));
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="manage-department">
        <h2 className="department-title">Manage Departments</h2>

        {/* Department Form */}
        <div className="department-form">
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment.emp_department}
            onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department Manager"
            value={newDepartment.manager}
            onChange={(e) => setNewDepartment({ ...newDepartment, manager: e.target.value })}
          />
          {!isEditing ? (
            <button className="btn-add" onClick={handleAddDepartment}>
              Add Department
            </button>
          ) : (
            <button className="btn-save" onClick={handleSaveEdit}>
              Save Changes
            </button>
          )}
        </div>

        {/* Department List */}
        <div className="department-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.emp_id}>
                  <td>{department.emp_id}</td>
                  <td>{department.emp_department}</td>
                  <td>{department.manager}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditDepartment(department.id)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteDepartment(department.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Navigation Button */}
        <button className="btn-back" onClick={() => navigate('/admindashboard')}>
          Back to Dashboard
        </button>
      </div>
      <AdminFooter />
    </>
  );
};

export default ManageDepartment;
