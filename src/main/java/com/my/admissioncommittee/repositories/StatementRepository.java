package com.my.admissioncommittee.repositories;

import com.my.admissioncommittee.entities.Statement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatementRepository extends JpaRepository<Statement, Long> {
    Statement findById(long id);
    List<Statement> findStatementsByFacultyId(Long id);
    @Query(value = "SELECT faculty_id FROM statement WHERE statement.user_id=?", nativeQuery = true)
    List<Long> findFacultyIdsByUserId(Long id);
    boolean existsByUserIdAndFacultyId(long userId, long facultyId);
}
