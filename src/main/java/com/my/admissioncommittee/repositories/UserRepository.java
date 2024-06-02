package com.my.admissioncommittee.repositories;

import com.my.admissioncommittee.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
    User findByLoginAndPassword(String login, String password);
    User findById(long id);
    //List<User> findUsersByIds(List<Long> id);
    boolean existsByLogin(String login);
}
