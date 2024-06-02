package com.my.admissioncommittee.controllers;

import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.entities.FacultyInfo;
import com.my.admissioncommittee.entities.Statement;
import com.my.admissioncommittee.entities.User;
import com.my.admissioncommittee.services.FacultyService;
import com.my.admissioncommittee.services.StatementService;
import com.my.admissioncommittee.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@RestController
public class FacultyController {
    private final static Logger LOGGER = Logger.getLogger(UserController.class);

    private final FacultyService facultyService;
    private final StatementService statementService;
    private final UserService userService;

    @Autowired
    public FacultyController(FacultyService facultyService, StatementService statementService, UserService userService) {
        this.facultyService = facultyService;
        this.statementService = statementService;
        this.userService = userService;
    }

    @GetMapping("/getFaculty/{id}")
    public Faculty getFaculty(@PathVariable Long id) {
        LOGGER.info("Get Faculty /faculty/{id}");
        return facultyService.findById(id);
    }

    @GetMapping("/getFacultyInfo/{id}")
    public FacultyInfo getFacultyInfo(@PathVariable Long id) {
        LOGGER.info("Get facultyInfo by facultyId /getFacultyInfo");
        Faculty faculty = facultyService.findById(id);
        List<Statement> statementList = statementService.getStatementListByFacultyId(id);
        List<User> userList = userService.getUsersByIds(id);
        return new FacultyInfo(faculty, statementList, userList);
    }

    @PostMapping("/faculty")
    public String addNewFaculty(@Valid @RequestBody Faculty faculty, BindingResult bindingResult) {
        LOGGER.info("Post /faculty");
        boolean alreadyExists = facultyService.existsByName(faculty.getName());
        if(alreadyExists) {
            bindingResult.rejectValue(
                    "name",
                    "",
                    "Faculty with such name already exists"
            );
        }
        if(bindingResult.hasErrors()) {
            LOGGER.error("Error while adding new faculty");
            return "addFaculty";
        }
        facultyService.save(faculty);
        return "redirect:/home";
    }

    @GetMapping("/getFaculties/{pageNum}")
    public Collection<Faculty> getFaculties(@PathVariable("pageNum") int pageNum) {
        LOGGER.info("Get /getFaculties");
        Page<Faculty> page = facultyService.getPage(pageNum - 1);
        return page.getContent();
    }

    @PutMapping("/getFaculties/faculty/{id}")
    public void updateFaculty(@Valid @RequestBody Faculty faculty, @PathVariable("id") Long id) {
        LOGGER.info("Update /faculty/{id}");
        faculty.setId(id);
        facultyService.save(faculty);
        //return facultyService.findByName(faculty.getName());
    }

    @DeleteMapping("/getFaculties/faculty/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        LOGGER.info("Delete /faculty/{id}");
        facultyService.deleteById(id);
    }
}
