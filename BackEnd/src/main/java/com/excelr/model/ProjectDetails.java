package com.excelr.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data 
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long empId;

    private String projectCode;

    private LocalDate startDate;

    private LocalDate endDate;

    private String clientName;

    private String managerEmail;

    private boolean isCurrentProject;
}

