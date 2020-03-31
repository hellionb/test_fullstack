package com.finalgo.application.bean;

/**
 * Objet permettant le transfert des données de Register du front vers le back
 */
public class RegisterBean {
    private String username;
    private String password;
    private String email;


    public RegisterBean() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
