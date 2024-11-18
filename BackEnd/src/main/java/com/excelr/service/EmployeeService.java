package com.excelr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Employee;
import com.excelr.repo.EmployeeRepo;

@Service
public class EmployeeService implements EmployeeInterface {

	@Autowired
	private EmployeeRepo repo;
	
	@Override
	public Employee saveEmployee(Employee employee) {
		// TODO Auto-generated method stub
		return repo.save(employee) ;
	}

	@Override
	public List<Employee> getAllEmployees() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}
	

	@Override
	public String deleteById(int id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
		return "record deleted successfully";
	}

	@Override
	public Employee getEmployee(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id).get();
	}
	
	@Override
	public Employee updateEmployee(int empId, Employee employeeDetails) {
        Optional<Employee> existingEmployeeOpt = repo.findById(empId);
        if (existingEmployeeOpt.isPresent()) {
            Employee existingEmployee = existingEmployeeOpt.get();
            // Update fields
            existingEmployee.setEmp_fullname(employeeDetails.getEmp_fullname());
            existingEmployee.setEmp_DOB(employeeDetails.getEmp_DOB());
            existingEmployee.setEmp_age(employeeDetails.getEmp_age());
            existingEmployee.setEmp_gender(employeeDetails.getEmp_gender());
            existingEmployee.setEmp_currentadd(employeeDetails.getEmp_currentadd());
            existingEmployee.setEmp_permanentadd(employeeDetails.getEmp_permanentadd());
            existingEmployee.setEmp_department(employeeDetails.getEmp_department());
            existingEmployee.setEmp_mail(employeeDetails.getEmp_mail());
            existingEmployee.setPan_no(employeeDetails.getPan_no());
            existingEmployee.setAdhar_no(employeeDetails.getAdhar_no());
            existingEmployee.setAcc_num(employeeDetails.getAcc_num());
            existingEmployee.setIFSC(employeeDetails.getIFSC());
            existingEmployee.setEmp_DOJ(employeeDetails.getEmp_DOJ());
            
            return repo.save(existingEmployee);
        }
		return null;
	
	}

}
