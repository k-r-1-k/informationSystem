package com.my.admissioncommittee.services;

import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.repositories.FacultyRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class FacultyService {
    private final static Logger LOGGER = Logger.getLogger(FacultyService.class);
    private final static int PAGE_SIZE = 5;
    private final FacultyRepository facultyRepository;

    @Autowired
    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public void update(Faculty faculty) {
        LOGGER.info("Updating faculty " + faculty.getName());
        facultyRepository.save(faculty);
    }

    public void save(Faculty faculty) {
        LOGGER.info("Saving new faculty " + faculty.getName());
        facultyRepository.save(faculty);
    }

    public void deleteById(Long id) {
        LOGGER.info("Delete faculty " + id);
        facultyRepository.deleteById(id);
    }

    public List<Faculty> findAll() {
        LOGGER.info("Getting all faculties");
        return facultyRepository.findAll();
    }

    public Faculty findById(long id) {
        LOGGER.info("Getting faculty by id " + id);
        return facultyRepository.findById(id);
    }

    public Faculty findByName(String name) {
        LOGGER.info("Getting faculty by name " + name);
        return facultyRepository.findByName(name);
    }

    public Page<Faculty> getPage(int pageNum) {
        LOGGER.info("Getting faculty page at number " + pageNum);
        Pageable paging = PageRequest.of(pageNum, PAGE_SIZE);
        return facultyRepository.findAll(paging);
    }

    public boolean existsByName(String name) {
        LOGGER.info("Checking if faculty " + name + " exists");
        return facultyRepository.existsByName(name);
    }
}
