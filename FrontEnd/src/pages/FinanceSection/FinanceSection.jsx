import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./FinanceSection.css";
import EmployeeNavBar from "../../components/EmployeeNavBar";
import EmployeeFooter from "../../components/EmployeeFooter";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const FinanceSection = ({ onEditClick }) => {
  const [financeDetails, setFinanceDetails] = useState(null);
  const { id } = useParams(); // Destructure to get employee ID
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch finance details from API
  useEffect(() => {
    const fetchFinanceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/${id}`);
        console.log(response.data);
        setFinanceDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch finance details");
        setLoading(false);
      }
    };

    fetchFinanceDetails();
  }, [id]);

  const handleDownloadPayslip = () => {
    if (!duration) {
      alert("Please select a duration.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Rohan Company", 20, 10);
    doc.setFontSize(12);
    doc.text("Company Address, City, State, ZIP", 20, 15);
    doc.text("Phone: 9488452565 | Email: reko@company.com", 20, 20);
    doc.text("Date of Issue: " + new Date().toLocaleDateString(), 20, 25);
    doc.text("Employee Payslip", 20, 35);

    if (financeDetails) {
      doc.text(`Full Name: ${financeDetails.emp_fullname}`, 20, 45);
      doc.text(`Employee ID: ${financeDetails.emp_id}`, 20, 50);
      doc.text(`PAN Card: ${financeDetails.pan_no}`, 20, 55);
      doc.text(`Bank Name: ${financeDetails.bank_name}`, 20, 60);
      doc.text(`Branch Name: ${financeDetails.branch_name}`, 20, 65);
      doc.text(`IFSC Code: ${financeDetails.ifsc}`, 20, 70);
    }

    // Prepare data for the selected duration
    let totalEarnings = 0;
    let totalDeductions = 0;
    let monthData = [];
    const currentMonth = new Date();

    for (let i = 0; i < duration; i++) {
      const monthSalary = financeDetails.emp_monthly_salary;
      const monthAllowances = financeDetails.emp_Allowances;
      const monthDeductions = financeDetails.leave_deductions;

      monthData.push({
        month: `${currentMonth.getMonth() + 1 - i}/${currentMonth.getFullYear()}`,
        salary: monthSalary,
        allowances: monthAllowances,
        deductions: monthDeductions,
        netSalary: monthSalary + monthAllowances - monthDeductions,
      });

      totalEarnings += monthSalary + monthAllowances;
      totalDeductions += monthDeductions;
    }

    // Add Monthly Salary Data to PDF
    doc.autoTable({
      startY: 80,
      head: [["Month", "Monthly Salary", "Allowances", "Deductions", "Net Salary"]],
      body: monthData.map(data => [
        data.month,
        `₹${data.salary}`,
        `₹${data.allowances}`,
        `₹${data.deductions}`,
        `₹${data.netSalary}`
      ]),
    });

    // Total Earnings and Deductions
    doc.setFontSize(12);
    doc.text(`Total Earnings (last ${duration} months): ₹${totalEarnings}`, 20, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Deductions (last ${duration} months): ₹${totalDeductions}`, 20, doc.lastAutoTable.finalY + 15);
    const netTotal = totalEarnings - totalDeductions;
    doc.text(`Net Total Salary (last ${duration} months): ₹${netTotal}`, 20, doc.lastAutoTable.finalY + 20);

    doc.text("Authorized Signature: P-17 EMS", 20, doc.lastAutoTable.finalY + 30);
    doc.text('Confidentiality Notice: "This payslip is confidential and intended solely for the recipient."', 20, doc.lastAutoTable.finalY + 40);

    doc.save("Payslip.pdf");
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <EmployeeNavBar />
      <div className="finance-section">
        {/* Navigation Buttons */}
        <div className="button-group">
          <Link to={`/profile/${id}`}>
            <button className="profile-edit-btn">Home</button>
          </Link>
          <Link to={`/project/${id}`}>
            <button className="profile-edit-btn">Project Details</button>
          </Link>
        
        </div>

        <h3 className="finance-title">Finance Details</h3>
        <div className="finance-details">
          <div className="finance-detail">
            <strong>Full Name:</strong> <span>{financeDetails.emp_fullname}</span>
          </div>
          <div className="finance-detail">
            <strong>Employee ID:</strong> <span>{financeDetails.emp_id}</span>
          </div>
          <div className="finance-detail">
            <strong>Monthly Salary:</strong> <span>₹{financeDetails?.emp_monthly_salary || "Loading..."}</span>
          </div>
          <div className="finance-detail">
            <strong>Allowances:</strong> <span>₹{financeDetails.emp_Allowances}</span>
          </div>
          <div className="finance-detail">
            <strong>Deductions:</strong> <span>₹{financeDetails.leave_deductions}</span>
          </div>
          <div className="finance-detail">
            <strong>Annual Salary:</strong> <span>₹{financeDetails.emp_ctc}</span>
          </div>
          <div className="finance-detail">
            <strong>PAN Card:</strong> <span>{financeDetails.pan_no}</span>
          </div>
          <div className="finance-detail">
            <strong>Bank Name:</strong> <span>{financeDetails.bank_name}</span>
          </div>
          <div className="finance-detail">
            <strong>Branch Name:</strong> <span>{financeDetails.branch_name}</span>
          </div>
          <div className="finance-detail">
            <strong>IFSC Code:</strong> <span>{financeDetails.ifsc}</span>
          </div>
        </div>

        <div className="duration-selector">
          <label>Select Duration:</label>
          <select onChange={handleDurationChange} value={duration}>
            <option value="">Select Option</option>
            <option value={6}>Last 6 Months</option>
            <option value={12}>Last 12 Months</option>
            <option value={24}>Last 24 Months</option>
          </select>
        </div>

        <div className="button-group">
          
          <button className="download-payslip" onClick={handleDownloadPayslip}>
            Download Payslip
          </button>
        </div>
      </div>
      <EmployeeFooter />
    </>
  );
};

export default FinanceSection;
