package com.my.admissioncommittee.controllers;

import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.entities.User;
import com.my.admissioncommittee.services.FacultyService;
import com.my.admissioncommittee.services.StatementService;
import com.my.admissioncommittee.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@RestController
/*@CrossOrigin("*")*/
public class UserController {
    private final static Logger LOGGER = Logger.getLogger(UserController.class);

    public static User user = null;
    private final UserService userService;
    private final StatementService statementService;
    private final FacultyService facultyService;

    @Autowired
    public UserController(UserService userService, StatementService statementService, FacultyService facultyService) {
        this.userService = userService;
        this.statementService = statementService;
        this.facultyService = facultyService;
        //this.user = null;
    }

    @GetMapping("/getUser")
    public User getUser() {
        LOGGER.info("Get info about our user /getUser");
        return this.user;
    }

    @GetMapping("/getUsers")
    public Collection<User> getUsers() {
        LOGGER.info("Get all users /getUsers");
        return userService.findAll();
    }

    @PutMapping("/getUsers/blockUser/{id}")
    public void blockUser(@PathVariable long id) {
        LOGGER.info("Block user with id /getUsers/blockUser/{id}" + id);
        userService.blockUser(id);
    }

    @PutMapping("/getUsers/unblockUser/{id}")
    public void unblockUser(@PathVariable long id) {
        LOGGER.info("Unblock user with id /getUsers/unblockUser/{id}" + id);
        userService.unblockUser(id);
    }

    @PutMapping("/getUsers/makeAdmin/{id}")
    public void makeAdmin(@PathVariable long id) {
        LOGGER.info("Make the user an admin with id /getUsers/makeAdmin/{id}" + id);
        userService.makeAdmin(id);
    }

    @PostMapping("/logIn")
    public void logUserIn(@RequestBody User user) {
        LOGGER.info("Post /logIn");
        this.user = userService.getUserByLoginAndPassword(user.getLogin(), user.getPassword());
    }

    @PostMapping("/logOut")
    public void logUserIn() {
        LOGGER.info("Post /logOut");
        this.user = null;
    }

    @GetMapping("/getFacultiesWithoutUser")
    public Collection<Faculty> getFacultiesWithoutUser() {
        LOGGER.info("Get /getFacultiesWithoutUser");
        if(this.user == null) return null;
        return userService.getFacultiesWithoutUser(this.user.getId());
    }

    @PostMapping("/userRegistration")
    public void registerNewUser(@RequestBody User user) {
        LOGGER.info("Post /registration");
        boolean alreadyExists = userService.existsByLogin(user.getLogin());
        userService.save(user);
        this.user = userService.getUserByLoginAndPassword(user.getLogin(), user.getPassword());
    }
}
