package com.my.admissioncommittee.services;

import com.my.admissioncommittee.controllers.UserController;
import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.entities.Statement;
import com.my.admissioncommittee.entities.User;
import com.my.admissioncommittee.entities.enums.Role;
import com.my.admissioncommittee.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final static Logger LOGGER = Logger.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StatementService statementService;
    private final FacultyService facultyService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, StatementService statementService, FacultyService facultyService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.statementService = statementService;
        this.facultyService = facultyService;
    }

    public void update(User user) {
        LOGGER.info("Updating user " + user.getLogin());
        userRepository.save(user);
    }

    public List<Faculty> getFacultiesWithoutUser(long userId) {
        //List<Faculty> faculties = statementService.getFacultyIdsByUserId(userId).stream().map(facultyService::findById).toList();
        List<Long> facultyIds = statementService.getFacultyIdsByUserId(userId);
        List<Faculty> faculties = facultyIds.stream().map(facultyService::findById).toList();
        List<Faculty> answer = facultyService.findAll();
        answer.removeAll(faculties);
        return answer;
    }

    public void blockUser(long id) {
        LOGGER.info("Block user with id " + id);
        User user = userRepository.findById(id);
        user.setBlocked(true);
        user.setRole(Role.GUEST);
        userRepository.save(user);
    }

    public void unblockUser(long id) {
        LOGGER.info("Unblock user with id " + id);
        User user = userRepository.findById(id);
        user.setBlocked(false);
        user.setRole(Role.USER);
        userRepository.save(user);
    }

    public void makeAdmin(long id) {
        LOGGER.info("Make the user an admin with id " + id);
        User user = userRepository.findById(id);
        user.setRole(Role.ADMIN);
        userRepository.save(user);
    }

    public List<User> getUsersByIds(long id) {
        LOGGER.info("Get list of users by faculty id" + id);
        List<Long> userIds = statementService.getStatementListByFacultyId(id)
                .stream()
                .map(Statement::getUserId)
                .toList();
        List<User> users = new ArrayList<>();
        userIds.forEach(userId -> users.add(userRepository.findById(userId).orElse(null)));
        return users;
    }

    public User getUserByLoginAndPassword(String login, String password) {
        LOGGER.info("Get user by login and password" + login + " " + password);
        return userRepository.findByLoginAndPassword(login, password);
    }

    public void save(User user) {
        LOGGER.info("Saving new user " + user.getLogin());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);
    }

    public List<User> findAll() {
        LOGGER.info("Getting all users");
        return userRepository.findAll();
    }

    public boolean existsByLogin(String login) {
        LOGGER.info("checking if user " + login + " exists");
        return userRepository.existsByLogin(login);
    }

    public void createAdmin() {
        LOGGER.info("Creating and saving admin");
        User user = new User();
        user.setLogin("admin");
        user.setPassword(passwordEncoder.encode("1111"));
        user.setRole(Role.ADMIN);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UserController.user = userRepository.findByLogin(login);
        return userRepository.findByLogin(login);
    }
}
