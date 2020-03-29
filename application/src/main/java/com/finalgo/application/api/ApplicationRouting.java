package com.finalgo.application.api;

import com.finalgo.application.bean.LoginBean;
import com.finalgo.application.bean.ProjectBean;
import com.finalgo.application.bean.RegisterBean;
import com.finalgo.application.dao.ProjectDao;
import com.finalgo.application.dao.UserDao;
import com.finalgo.application.entity.Project;
import com.finalgo.application.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/application")
@ControllerAdvice
public class ApplicationRouting {

    @Autowired
    UserDao userDao;

    @Autowired
    ProjectDao projectDao;

    /**
     * Inscription d'un utilisateur
     * @param registerBean Objet contenant les informations envoyées par le front
     * @return User créé suite à l'inscription
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<User> register(@RequestBody RegisterBean registerBean) {
        if (userDao.findByEmail(registerBean.getEmail()) != null ||
            userDao.findByUsername(registerBean.getUsername()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User user = new User();
        user.setUsername(registerBean.getUsername());
        user.setPassword(registerBean.getPassword());
        user.setEmail(registerBean.getEmail());
        userDao.create(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Connection d'un utilisateur
     * @param loginBean Objet contenant les informations envoyées par le front
     * @return User récupéré de la base de donnéees
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody LoginBean loginBean) {
        User user = userDao.findWithCredentials(loginBean.getUsername(), loginBean.getPassword());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Sauvegarde d'un projet créé par l'utilisateur
     * @param projectBean Objet contenant les informations envoyées par le front
     * @return Projet créé
     */
    @RequestMapping(value = "/saveProject", method = RequestMethod.POST)
    public ResponseEntity<Project> saveProject(@RequestBody ProjectBean projectBean) {
        Project project = new Project();
        project.setName(projectBean.getName());
        project.setAmount(projectBean.getAmount());
        project.setDescription(projectBean.getDescription());
        project.setOwnerUsername(projectBean.getOwnerUsername());
        projectDao.create(project);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    /**
     * Récupération des projets d'un utilisateur
     * @param ownerUsername username du propriétaire des projets
     * @return Liste des projets
     */
    @RequestMapping(value = "/getProjects", method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getProjects(@RequestParam String ownerUsername) {
        List<Project> projects = projectDao.findProjectsByOwnerUsername(ownerUsername);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @RequestMapping(value = "/getProject", method = RequestMethod.GET)
    public ResponseEntity <Project> getProject(@RequestParam Long id) {
        Project project = projectDao.getProject(id);
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteProject", method = RequestMethod.DELETE)
    public void deleteProject(@RequestParam long id) {
        projectDao.deleteProject(id);

    }

    @RequestMapping(value="/getUsers", method = RequestMethod.GET)
    public List<User> allUsers() {
        return userDao.findAll();
    }

}



