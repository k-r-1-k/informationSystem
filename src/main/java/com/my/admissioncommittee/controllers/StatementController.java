package com.my.admissioncommittee.controllers;

import com.my.admissioncommittee.entities.Statement;
import com.my.admissioncommittee.entities.StatementInfo;
import com.my.admissioncommittee.services.FacultyService;
import com.my.admissioncommittee.services.StatementService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StatementController {
    private static final Logger LOGGER = Logger.getLogger(StatementController.class);
    private final StatementService statementService;
    private final FacultyService facultyService;

    @Autowired
    public StatementController(StatementService statementService, FacultyService facultyService) {
        this.statementService = statementService;
        this.facultyService = facultyService;
    }

    @PutMapping("/getFaculty/statementPermit/{id}")
    public void permit(@PathVariable long id) {
        LOGGER.info("Take permit for student /statementPermit/{id}" + id);
        statementService.permit(id);
    }

    @PutMapping("/getFaculty/statementForbid/{id}")
    public void forbid(@PathVariable long id) {
        LOGGER.info("Take forbid for student /statementForbid/{id}" + id);
        statementService.forbid(id);
    }

    @PostMapping("/registerForFaculties")
    public void addNewStatement(@RequestBody StatementInfo statementInfo) {
        LOGGER.info("Post register user for faculties /registerForFaculties");
        long userId = UserController.user.getId();
        for (Long facultyId :statementInfo.getSelectedFaculties()) {
            statementService.save(Statement.builder()
                    .id(0)
                    .userId(userId)
                    .facultyId(facultyId)
                    .mark1(statementInfo.getMark1())
                    .mark2(statementInfo.getMark2())
                    .mark3(statementInfo.getMark3())
                    .avgCerMark(statementInfo.getAvgCerMark())
                    .build());
        }
    }
}
