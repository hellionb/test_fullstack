package com.finalgo.application.bean;

import org.hibernate.usertype.UserType;

/**
 * Objet permettant le transfert des données de Login du front vers le back
 */
public class LoginBean {
    private String username;
    private String password;
    private UserType type;

    public LoginBean() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserType getType() { return type;}

    public void setType(UserType type) { this.type = type;}
}
