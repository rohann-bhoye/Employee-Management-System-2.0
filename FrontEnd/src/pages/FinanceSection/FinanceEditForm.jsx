// src/pages/FinanceEditForm.jsx
import  { useState } from "react";
import './FinanceEditForm.css'; 
import EmployeeFooter from "../../components/EmployeeFooter";
import EmployeeNavBar from "../../components/EmployeeNavBar";

const FinanceEditForm = ({ financeDetails, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState(financeDetails);
  const [errors, setErrors] = useState({});
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.panCard.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
      newErrors.panCard = "Invalid PAN card format (e.g., ABCDE1234F)";
    }
    if (!formValues.aadharCard.match(/^\d{12}$/)) {
      newErrors.aadharCard = "Invalid Aadhar card number (12 digits required)";
    }
    if (!formValues.ifscCode.match(/^[A-Za-z]{4}\d{7}$/)) {
      newErrors.ifscCode = "Invalid IFSC code format (e.g., ABCD0123456)";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSave(formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
    <EmployeeNavBar/>
    <div className="finance-edit-form">
      <h3>Edit Finance Details</h3>

      {/* PAN Card and Aadhar Card */}
      <div className="field-group">
        <div className="field">
          <label>PAN Card:</label>
          <input
            type="text"
            name="panCard"
            value={formValues.panCard}
            onChange={handleInputChange}
            />
          {errors.panCard && <span className="error">{errors.panCard}</span>}
        </div>
        <div className="field">
          <label>Aadhar Card:</label>
          <input
            type="text"
            name="aadharCard"
            value={formValues.aadharCard}
            onChange={handleInputChange}
            />
          {errors.aadharCard && <span className="error">{errors.aadharCard}</span>}
        </div>
      </div>

      {/* Bank Name and Branch */}
      <div className="field-group">
        <div className="field">
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formValues.bankName}
            onChange={handleInputChange}
            />
        </div>
        <div className="field">
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            value={formValues.branch}
            onChange={handleInputChange}
            />
        </div>
      </div>

      {/* IFSC Code and CTC Breakup */}
      <div className="field-group">
        <div className="field">
          <label>IFSC Code:</label>
          <input
            type="text"
            name="ifscCode"
            value={formValues.ifscCode}
            onChange={handleInputChange}
            />
          {errors.ifscCode && <span className="error">{errors.ifscCode}</span>}
        </div>
        <div className="field">
          <label>CTC Breakup:</label>
          <textarea
            name="ctcBreakup"
            value={formValues.ctcBreakup}
            onChange={handleInputChange}
            />
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button onClick={handleSubmit} className="save-button">
          Save
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
    <EmployeeFooter/>
            </>
  );
};

export default FinanceEditForm;
