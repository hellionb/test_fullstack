package com.finalgo.application.bean;

import com.finalgo.application.entity.User;
import org.springframework.data.jpa.repository.Query;

/**
 * Objet permettant le transfert des données de Login du front vers le back
 */
public class ProjectBean {
    private Integer id;
    private String name;
    private Integer amount;
    private String description;
    private String ownerUsername;

    public ProjectBean() {
    }

    public Integer getId() {
        return id;
    }

    public void setId() {
        this.id=id;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }




}
