package com.finalgo.application.dao;

import com.finalgo.application.entity.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectDao extends AbstractGenericDao {

    /**
     * Récupèrer les projets associés à un utilisateur :
     *
     * @param ownerUsername
     * @return User
     */
    public List<Project> findProjectsWithOwnerUsername(String ownerUsername) {
        String query = "FROM Project p where p.ownerUsername='" + ownerUsername + "'";
        return createSelectQuery(query);
    }

}
