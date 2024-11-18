package com.excelr.service;


import java.util.List;

import com.excelr.model.ProjectDetails;

public interface ProjectServiceInterface {

    List<ProjectDetails> getAllProjects();

    List<ProjectDetails> getProjectsByEmpId(Long empId);

    ProjectDetails addProject(ProjectDetails project);

    ProjectDetails updateProject(Long id, ProjectDetails projectDetails);
}

