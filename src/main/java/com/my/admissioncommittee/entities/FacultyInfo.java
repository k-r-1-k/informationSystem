package com.my.admissioncommittee.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FacultyInfo {
    private Faculty faculty;
    private List<Statement> statementList;
    private List<User> userList;
}
