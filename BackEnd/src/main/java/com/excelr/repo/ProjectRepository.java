package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


import com.excelr.model.ProjectDetails;

public interface ProjectRepository extends JpaRepository<ProjectDetails, Long> {
    List<ProjectDetails> findByEmpId(Long empId);
}
