package com.finalgo.application.dao;

import com.finalgo.application.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserDao extends AbstractGenericDao<User> {

    public UserDao() {
        super(User.class);
    }

    public boolean userExists(String email, String username){
        String query = "from User where username = '"+username+"' or email = '"+email+"'";
        return createOneItemSelectQuery(query)!=null;
    }
    /**
     * Récupèrer l'utilisateur correspondant aux paramètres suivant:
     * @param username
     * @param password
     * @return User
     *
     * TODO Implémenter la requête Hibernate/SQL
     */
    public User findWithCredentials(String username, String password) {
        String query = "from User where username = '"+username+"' and password = '"+password+"'";
        return createOneItemSelectQuery(query);
    }
}
