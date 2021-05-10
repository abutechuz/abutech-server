-- Create a new database called 'abutech'
CREATE DATABASE abutech;
CREATE EXTENSION "pgcrypto";

-- main admin = 0
-- moderator admin = 1
-- ordinary user = 3

create domain username as varchar(32) check(value ~* '^@?(\w){4,32}$');

CREATE TABLE users(
  user_id int generated by default as identity primary key,
  user_username username NOT NULL,
  user_password VARCHAR(72) NOT NULL,
  user_created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

create unique index admin_idx on users(user_username)

comment on table users is 'Table for users and admins';


CREATE TABLE submittions(
  submittion_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  submittion_active boolean DEFAULT TRUE,
  submittion_fullname varchar(64) NOT NULL,
  submittion_message varchar(1000) NOT NULL,
  submittion_phone varchar(15) NOT NULL,
  submittion_email varchar(320) DEFAULT NULL,
  submittion_companyname varchar(32) DEFAULT NULL,
  submittion_created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

comment on table submittions is 'Form submittions from clients';


create table project_types(
  project_type_id INT GENERATED BY  DEFAULT AS IDENTITY PRIMARY KEY,
  project_type_name varchar(128),
  project_type_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

create unique index project_types_idx on project_types(lower(project_type_name));


CREATE TABLE projects(
  project_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  project_title varchar(256) NOT NULL,
  project_link varchar(2048) NOT NULL,
  project_visible boolean DEFAULT TRUE,
  project_image varchar(4096) NOT NULL,
  project_type int NOT NULL REFERENCES project_types(project_type_id),
  project_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

comment on table projects is 'Team''s completed projects list';
create unique index project_link_idx on projects(lower(project_link));


CREATE TABLE professions(
  profession_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  profession_name varchar(128) NOT NULL,
  profession_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

create unique index professions_uniq_idx on professions (lower(profession_name));

alter table professions drop column profession_active;

comment on table professions is 'Professions';


CREATE TABLE members(
  member_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  member_active boolean DEFAULT TRUE,
  member_fullname varchar(64) NOT NULL,
  member_picture varchar(4096) NOT NULL,
  member_profession int NOT NULL REFERENCES professions(profession_id),
  member_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

comment on table members is 'Our team''s members';


CREATE TABLE services(
  service_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,

  service_image varchar(4096) NOT NULL,

  service_title_uz varchar(32) NOT NULL,
  service_summary_uz varchar(1000) NOT NULL,

  service_title_ru varchar(32) NOT NULL,
  service_summary_ru varchar(1000) NOT NULL,

  service_title_en varchar(32) NOT NULL,
  service_summary_en varchar(1000) NOT NULL,

  service_active boolean default true,
  service_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

comment on table services is 'What services we offer';

create TABLE technology_type(
  technology_type_id INT GENERATED BY default as identity PRIMARY KEY,

);

create type techtype as enum ('backend', 'frontend', 'mobile', 'database', 'design');


CREATE TABLE technologies(
  technology_id INT GENERATED BY default as identity PRIMARY KEY,
  technology_name varchar(64) NOT NULL,
  technology_type techtype NOT NULL,
  technology_image varchar(4096) NOT NULL,
  technology_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);

insert into technologies(
  technology_name,
  technology_type,
  technology_image
)
values
 (
   'React',
   'frontend',
   'image.jpg'
 ),
  (
   'Angular',
   'frontend',
   'image.jpg'
 ),
  (
   'Postman',
   'backend',
   'image.jpg'
 )
;

create table docs (
doc_id serial not NULL primary key,
doc_src VARCHAR(4096) not null ,
service_id int not null REFERENCES services(service_id) ,
doc_date TIMESTAMP not null default CURRENT_TIMESTAMP
);
-- create unique index technologies_uniq_idx on technologies(lower(technology_name));
-- comment on table blogs is 'What technologies we use!';


-- CREATE TABLE vacancies();
-- CREATE TABLE videos();
-- CREATE TABLE blogs (
--   blog_id int generated by default as identity PRIMARY KEY,
--   blog_title_uz text,
--   blog_content_uz text,

--   blog_title_en text,
--   blog_content_en text,

--   blog_title_ru text,
--   blog_content_ru text,

--   blog_post_owner int NOT NULL REFERENCES users(user_id),
--   blog_created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
-- );

-- comment on table blogs is 'Blogs written by our teams';
