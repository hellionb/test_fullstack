package com.finalgo.application.api;

import com.finalgo.application.bean.LoginBean;
import com.finalgo.application.bean.ProjectBean;
import com.finalgo.application.bean.RegisterBean;
import com.finalgo.application.dao.UserDao;
import com.finalgo.application.entity.Project;
import com.finalgo.application.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
@ControllerAdvice
public class ApplicationRouting {

    @Autowired
    UserDao userDao;

    /**
     * Inscription d'un utilisateur
     * @param registerBean Objet contenant les informations envoyées par le front
     * @return User créé suite à l'inscription
     *
     * TODO 1: Empêcher l'ajout d'un utilisateur déjà existant
     * -> doublon si l'username ou l'email est déjà existant
     * -> modifier la fonction pour ne pas avoir de doublon
     * -> renvoyer une erreur `HttpStatus.CONFLICT`
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<User> register(@RequestBody RegisterBean registerBean) {
        User user = new User();
        user.setUsername(registerBean.getUsername());
        user.setPassword(registerBean.getPassword());
        user.setEmail(registerBean.getEmail());
        if (userDao.userExists(registerBean.getEmail(),registerBean.getUsername()))
            return new ResponseEntity<>(user, HttpStatus.CONFLICT);
        userDao.create(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Connection d'un utilisateur
     * @param loginBean Objet contenant les informations envoyées par le front
     * @return User récupéré de la base de donnéees
     *
     * TODO 2: Implémenter la connection d'un utilisateur
     * -> Récupérer l'utilisateur dans la base de données avec le bon mot de passe
     * -> Si aucun utilisateur n'est trouvé, renvoyer une erreur `HttpStatus.NOT_FOUND`
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody LoginBean loginBean) {
        // TODO Implémenter la fonction `userDao.findWithCredentials` ci-dessous
        User user = userDao.findWithCredentials(loginBean.getUsername(), loginBean.getPassword());
        return user==null?
                new ResponseEntity<>(null, HttpStatus.NOT_FOUND)
                :
                new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Sauvegarde d'un projet créé par l'utilisateur
     * @param projectBean Objet contenant les informations envoyées par le front
     * @return Projet créé
     *
     * TODO 3: Implémenter la sauvegarde d'un projet
     * -> Créer un projet
     * -> Sauvegarder le projet dans dans la base de données
     * -> Prendre exemple sur UserDao pour implémenter la connection Hibernate 'ProjectDao'
     */
    @RequestMapping(value = "/saveProject", method = RequestMethod.POST)
    public ResponseEntity<Project> saveProject(@RequestBody ProjectBean projectBean) {
        Project project = null;
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    /*
      TODO 4: Implémenter la requête pour récupérer des projets créés par un utilisateur
      Exemple de requête: GET -> localhost:8080/application/getProjects?ownerUsername=user1234 -> [{..}, {..}]
      Le seul paramètre sera un `ownerUsername`
      On veut une List<Project> récupérée de la table 'Project'
     */
}
