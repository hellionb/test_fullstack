package com.finalgo.application.dao;

import com.finalgo.application.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserDao extends AbstractGenericDao<User> {

    public UserDao() {
        super(User.class);
    }

    /**
     * Récupèrer l'utilisateur correspondant aux paramètres suivant:
     *
     * @param username
     * @param password
     * @return User
     */
    public User findWithCredentials(String username, String password) {
        String query = "FROM User u where u.username='" + username + "'" + " AND " + "u.password='" + password + "'";
        return createOneItemSelectQuery(query);
    }

}
