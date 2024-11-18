package com.excelr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.model.Employee;
import com.excelr.service.EmployeeService;


@RestController
@CrossOrigin("*")
public class EmployeeController {
	
	@Autowired
	private EmployeeService service;
	

	@PostMapping("/create")
	public Employee createEmployee(@RequestBody Employee employee) {
		return service.saveEmployee(employee);
	}
	
	@GetMapping("/get")
	public List<Employee> allEmployees(){
		return service.getAllEmployees();
	}
	 
	@DeleteMapping("/delete/{id}")
		public String deleteRecord(@PathVariable int id) {
			return service.deleteById(id);
		}
	
  @GetMapping("/employee/{id}")
  public Employee getById(@PathVariable int id) {
	  return service.getEmployee(id);
  }
  
  @PutMapping("/employeeEditSave/{id}")
  public ResponseEntity<Employee> updateEmployee(@PathVariable("id") int empId, @RequestBody Employee employeeDetails) {
      Employee updatedEmployee = service.updateEmployee(empId, employeeDetails);
      if (updatedEmployee != null) {
          return ResponseEntity.ok(updatedEmployee);
      }
      return ResponseEntity.notFound().build(); // Return 404 if employee not found
  }	
}
