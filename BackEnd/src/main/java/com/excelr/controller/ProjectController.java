package com.excelr.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.excelr.model.ProjectDetails;
import com.excelr.service.ProjectService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    // Constructor injection
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Get all projects
    @GetMapping("/getAllProjects")
    public ResponseEntity<List<ProjectDetails>> getAllProjects() {
        List<ProjectDetails> projects = projectService.getAllProjects();
        if (projects.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        System.out.print(projects);
        return ResponseEntity.ok(projects);
    }

    // Get projects by employee ID
    @GetMapping("/employee/{empId}")
    public ResponseEntity<List<ProjectDetails>> getProjectsByEmpId(@PathVariable Long emp_id) {
        List<ProjectDetails> projects = projectService.getProjectsByEmpId(emp_id);
        if (projects.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }

    // Add a new project
    @PostMapping("/addProject")
    public ResponseEntity<ProjectDetails> addProject(@RequestBody ProjectDetails projectDetails) {
        ProjectDetails savedProject = projectService.addProject(projectDetails);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    // Update a project
    @PutMapping("update/{id}")
    public ResponseEntity<ProjectDetails> updateProject(
            @PathVariable Long id, @RequestBody ProjectDetails projectDetails) {
        ProjectDetails updatedProject = projectService.updateProject(id, projectDetails);
        return ResponseEntity.ok(updatedProject);
    }
}
