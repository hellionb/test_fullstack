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
     * register new user
     * @param registerBean
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<User> register(@RequestBody RegisterBean registerBean) {
        if (userDao.findWithCredentials(registerBean.getUsername(), registerBean.getPassword()) == null) {
            User user = new User();
            user.setUsername(registerBean.getUsername());
            user.setPassword(registerBean.getPassword());
            user.setEmail(registerBean.getEmail());
            userDao.create(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    /**
     * login
     * @param loginBean
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody LoginBean loginBean) {
        // TODO Implémenter la fonction `userDao.findWithCredentials` ci-dessous
        User user = userDao.findWithCredentials(loginBean.getUsername(), loginBean.getPassword());
        if (user != null) return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
    }

    /**
     * save new project
     * @param projectBean
     * @return
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
     * get project by ownerUsername
     * @param ownerUsername
     * @return
     */
    @GetMapping(value = "/getProjects")
    public ResponseEntity<List<Project>> findProjectByOwnerUsername(@RequestParam String ownerUsername) {
        List<Project> projects = projectDao.findProjectsWithOwnerUsername(ownerUsername);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
}
