package com.excelr.service;

import java.util.List;

import com.excelr.model.Employee;

public interface EmployeeInterface {

	public Employee saveEmployee(Employee employee);
    public List<Employee> getAllEmployees();
    public String deleteById(int id);
    public Employee getEmployee(int id);
    public Employee updateEmployee(int id,Employee employeeDetails);
    
}
