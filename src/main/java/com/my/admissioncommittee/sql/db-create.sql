DROP TABLE statement;
DROP TABLE faculty;
DROP TABLE users;

create table faculty (
                         id int8 not null,
                         budget_places int8 not null,
                         name varchar(255) not null,
                         total_places int8 not null,
                         primary key (id)
);

create table users (
                       id int8 not null,
                       blocked boolean not null,
                       city varchar(255) not null,
                       educational_institution varchar(255) not null,
                       email varchar(255) not null,
                       login varchar(255) not null,
                       name varchar(255) not null,
                       password varchar(255) not null,
                       region varchar(255) not null,
                       role varchar(255) not null,
                       primary key (id)
);

create table statement (
                           id int8 not null,
                           avg_cer_mark float8 not null,
                           faculty_id int8 REFERENCES faculty ON DELETE CASCADE not null,
                           mark1 int4 not null,
                           mark2 int4 not null,
                           mark3 int4 not null,
                           passed boolean not null,
                           user_id int8 REFERENCES users ON DELETE CASCADE not null,
                           primary key (id)
)