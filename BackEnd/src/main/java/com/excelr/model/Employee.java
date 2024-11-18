package com.excelr.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int emp_id;
	private String emp_fullname;
	private int emp_DOB;
	private String emp_gender;
	private int emp_age;
	private String emp_currentadd;
	private String emp_permanentadd;
	private String emp_mail;
	private String emp_department;
	private int emp_ctc;
	private long emp_DOJ;
	private String adhar_no;
	private String acc_num;
	private String IFSC;
	private String pan_no;
	private String emp_MonthlySalary;
	private String emp_pf;
	private String emp_ESI;
	private String leave_deductions;
	private String emp_Allowances;
	private String bank_name;
	private String branch_name;

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getEmp_id() {
		return emp_id;
	}
	public void setEmp_id(int emp_id) {
		this.emp_id = emp_id;
	}
	public String getEmp_fullname() {
		return emp_fullname;
	}
	public void setEmp_fullname(String emp_fullname) {
		this.emp_fullname = emp_fullname;
	}
	public int getEmp_DOB() {
		return emp_DOB;
	}
	public void setEmp_DOB(int emp_DOB) {
		this.emp_DOB = emp_DOB;
	}
	public String getEmp_gender() {
		return emp_gender;
	}
	public void setEmp_gender(String emp_gender) {
		this.emp_gender = emp_gender;
	}
	public int getEmp_age() {
		return emp_age;
	}
	public void setEmp_age(int emp_age) {
		this.emp_age = emp_age;
	}
	public String getEmp_currentadd() {
		return emp_currentadd;
	}
	public void setEmp_currentadd(String emp_currentadd) {
		this.emp_currentadd = emp_currentadd;
	}
	public String getEmp_permanentadd() {
		return emp_permanentadd;
	}
	public void setEmp_permanentadd(String emp_permanentadd) {
		this.emp_permanentadd = emp_permanentadd;
	}
	public String getEmp_mail() {
		return emp_mail;
	}
	public void setEmp_mail(String emp_mail) {
		this.emp_mail = emp_mail;
	}
	
	public long getEmp_DOJ() {
		return emp_DOJ;
	}
	public void setEmp_DOJ(long emp_DOJ) {
		this.emp_DOJ = emp_DOJ;
	}
	public String getAdhar_no() {
		return adhar_no;
	}
	public void setAdhar_no(String adhar_no) {
		this.adhar_no = adhar_no;
	}
	public String getPan_no() {
		return pan_no;
	}
	public void setPan_no(String pan_no) {
		this.pan_no = pan_no;
	}
	public String getAcc_num() {
		return acc_num;
	}
	public void setAcc_num(String acc_num) {
		this.acc_num = acc_num;
	}
	public String getIFSC() {
		return IFSC;
	}
	public void setIFSC(String iFSC) {
		IFSC = iFSC;
	}
	
	
	public int getEmp_ctc() {
		return emp_ctc;
	}
	public void setEmp_ctc(int emp_ctc) {
		this.emp_ctc = emp_ctc;
	}
	@Override
	public String toString() {
		return "Employee [emp_id=" + emp_id + ", emp_fullname=" + emp_fullname + ", emp_DOB=" + emp_DOB
				+ ", emp_gender=" + emp_gender + ", emp_age=" + emp_age + ", emp_currentadd=" + emp_currentadd
				+ ", emp_permanentadd=" + emp_permanentadd + ", emp_mail=" + emp_mail +  
				", emp_ctc=" + emp_ctc + ", emp_DOJ=" + emp_DOJ + ", adhar_no=" + adhar_no + ", pan_no=" + pan_no
				+ ", acc_num=" + acc_num + ", IFSC=" + IFSC +"]";
	}
	public String getEmp_department() {
		return emp_department;
	}
	public void setEmp_department(String emp_department) {
		this.emp_department = emp_department;
	}
	public String getEmp_MonthlySalary() {
		return emp_MonthlySalary;
	}
	public void setEmp_MonthlySalary(String emp_MonthlySalary) {
		this.emp_MonthlySalary = emp_MonthlySalary;
	}
	public String getEmp_pf() {
		return emp_pf;
	}
	public void setEmp_pf(String emp_pf) {
		this.emp_pf = emp_pf;
	}
	public String getEmp_ESI() {
		return emp_ESI;
	}
	public void setEmp_ESI(String emp_ESI) {
		this.emp_ESI = emp_ESI;
	}
	public String getLeave_deductions() {
		return leave_deductions;
	}
	public void setLeave_deductions(String leave_deductions) {
		this.leave_deductions = leave_deductions;
	}
	public String getEmp_Allowances() {
		return emp_Allowances;
	}
	public void setEmp_Allowances(String emp_Allowances) {
		this.emp_Allowances = emp_Allowances;
	}
	public String getBank_name() {
		return bank_name;
	}
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}
	public String getBranch_name() {
		return branch_name;
	}
	public void setBranch_name(String branch_name) {
		this.branch_name = branch_name;
	}
	

}
