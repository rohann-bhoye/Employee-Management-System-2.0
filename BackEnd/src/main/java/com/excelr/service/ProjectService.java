package com.excelr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.excelr.model.ProjectDetails;
import com.excelr.repo.ProjectRepository;

@Service
public class ProjectService implements ProjectServiceInterface {
	
    private ProjectRepository projectRepository;
    
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

	@Override
	public List<ProjectDetails> getAllProjects() {
		// TODO Auto-generated method stub
		  return projectRepository.findAll();
	}

	@Override
	public List<ProjectDetails> getProjectsByEmpId(Long empId) {
		// TODO Auto-generated method stub
        return projectRepository.findByEmpId(empId);
	}

	@Override
	public ProjectDetails addProject(ProjectDetails project) {
		// TODO Auto-generated method stub
        return projectRepository.save(project);		
	}

	@Override
	public ProjectDetails updateProject(Long id, ProjectDetails projectDetails) {
		// TODO Auto-generated method stub
		ProjectDetails existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        existingProject.setProjectCode(projectDetails.getProjectCode());
        existingProject.setStartDate(projectDetails.getStartDate());
        existingProject.setEndDate(projectDetails.getEndDate());
        existingProject.setClientName(projectDetails.getClientName());
        existingProject.setManagerEmail(projectDetails.getManagerEmail());
        existingProject.setCurrentProject(projectDetails.isCurrentProject());
        return projectRepository.save(existingProject);
	}

}
