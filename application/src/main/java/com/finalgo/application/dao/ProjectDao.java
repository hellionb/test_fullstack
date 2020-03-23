package com.finalgo.application.dao;

import com.finalgo.application.entity.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectDao extends AbstractGenericDao<Project> {

    public ProjectDao() { super(Project.class); }

    public List<Project> findProjectsByOwnerUsername(String ownerUsername) {
        String query = "FROM Project WHERE ownerUsername = '" + ownerUsername + "'";
        return createSelectQuery(query);
    }
}
