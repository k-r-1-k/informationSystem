package com.my.admissioncommittee.repositories;

import com.my.admissioncommittee.entities.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Faculty findById(long id);
    Faculty findByName(String name);
    boolean existsByName(String name);
}
