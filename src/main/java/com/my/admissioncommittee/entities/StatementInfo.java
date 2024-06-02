package com.my.admissioncommittee.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatementInfo {
    List<Long> selectedFaculties;
    private int mark1;
    private int mark2;
    private int mark3;
    private double avgCerMark;
}
