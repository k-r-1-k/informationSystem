package com.my.admissioncommittee;

import com.my.admissioncommittee.controllers.StatementController;
import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.entities.Statement;
import com.my.admissioncommittee.entities.User;
import com.my.admissioncommittee.entities.enums.Role;
import com.my.admissioncommittee.repositories.FacultyRepository;
import com.my.admissioncommittee.repositories.StatementRepository;
import com.my.admissioncommittee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {

    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;
    private final StatementRepository statementRepository;

    @Autowired
    public Initializer(FacultyRepository facultyRepository, UserRepository userRepository, StatementRepository statementRepository) {
        this.facultyRepository = facultyRepository;
        this.userRepository = userRepository;
        this.statementRepository = statementRepository;
    }

    @Override
    public void run(String... args) {
        Faculty f1 = new Faculty(0, "faculty1", 10, 100);
        Faculty f2 =new Faculty(0, "faculty2", 20, 200);
        Faculty f3 =new Faculty(0, "faculty3", 30, 300);

        if(facultyRepository.findAll().size() == 0) {
            facultyRepository.save(f1);
            facultyRepository.save(f2);
            facultyRepository.save(f3);
        }

        User u1 =new User(0, "login1", "password1", Role.USER, "user1",
                "email1@gmail.com", "city1", "region1", "institution1", false);
        User u2 =new User(0, "login2", "password2", Role.USER, "user2",
                "email2@gmail.com", "city2", "region2", "institution2", false);
        User u3 =new User(0, "login3", "password3", Role.USER, "user3",
                "email3@gmail.com", "city3", "region3", "institution3", false);

        if(userRepository.findAll().size() == 0) {
            userRepository.save(u1);
            userRepository.save(u2);
            userRepository.save(u3);
        }

        if(statementRepository.findAll().size() == 0) {
            statementRepository.save(new Statement(0, u1.getId(), f1.getId(), 200, 200, 200, 10.75, false));
            statementRepository.save(new Statement(0, u2.getId(), f2.getId(), 150, 150, 150, 8.9, false));
            statementRepository.save(new Statement(0, u3.getId(), f3.getId(), 175, 150, 200, 11.8, false));
        }
    }
}