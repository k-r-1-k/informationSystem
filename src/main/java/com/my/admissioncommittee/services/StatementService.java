package com.my.admissioncommittee.services;

import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.entities.Statement;
import com.my.admissioncommittee.repositories.StatementRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class StatementService {
    private final static Logger LOGGER = Logger.getLogger(FacultyService.class);
    //private final static int PAGE_SIZE = 5;
    private final StatementRepository statementRepository;

    @Autowired
    public StatementService(StatementRepository statementRepository) {
        this.statementRepository = statementRepository;
    }

    public void update(Statement statement) {
        LOGGER.info("Updating statement " + statement.getId());
        statementRepository.save(statement);
    }

    public void permit(long id) {
        LOGGER.info("Take permit for student in statement" + id);
        Statement statement = statementRepository.findById(id);
        statement.setPassed(true);
        statementRepository.save(statement);
    }

    public void forbid(long id) {
        LOGGER.info("Take forbid for student in statement" + id);
        Statement statement = statementRepository.findById(id);
        statement.setPassed(false);
        statementRepository.save(statement);
    }

    public void save(Statement statement) {
        LOGGER.info("Saving new statement " + statement.getId());
        statementRepository.save(statement);
    }

    public List<Statement> findAll() {
        LOGGER.info("Getting all statements");
        return statementRepository.findAll();
    }

    public Statement findById(long id) {
        LOGGER.info("Getting statement by id " + id);
        return statementRepository.findById(id);
    }

    public List<Statement> getStatementListByFacultyId(Long id) {
        LOGGER.info("Getting statement list by faculty id " + id);
        return statementRepository.findStatementsByFacultyId(id);
    }

    public List<Long> getFacultyIdsByUserId(long userId) {
        LOGGER.info("Getting faculty ids with user id " + userId);
        return statementRepository.findFacultyIdsByUserId(userId);
    }

    /*public Page<Statement> getPage(int pageNum) {
        LOGGER.info("Getting statement page at number " + pageNum);
        Pageable paging = PageRequest.of(pageNum, PAGE_SIZE);
        return statementRepository.findAll(paging);
    }*/

    public boolean existsByUserIdAndFacultyId(long userId, long facultyId) {
        LOGGER.info("Checking if statement with user id " + userId + "and faculty id " + facultyId + " exists");
        return statementRepository.existsByUserIdAndFacultyId(userId, facultyId);
    }
}
