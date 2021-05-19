--Create a new database called 'abutech'
CREATE DATABASE abutech;
CREATE EXTENSION "pgcrypto";

create domain username as varchar(32) check(value~ * '^@?(\w){4,32}$');

CREATE TABLE users(user_id int generated by default as identity primary key,
  user_username username NOT NULL,
  user_password VARCHAR(72) NOT NULL,
  user_created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);

create unique index admin_idx on users(user_username) comment on table users is 'Table for admins';


CREATE TABLE submittions(submittion_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  submittion_active boolean DEFAULT TRUE,
  submittion_fullname varchar(64) DEFAULT NULL,
  submittion_message varchar(1028) DEFAULT NULL,
  submittion_phone varchar(20) NOT NULL,
  submittion_email varchar(320) DEFAULT NULL,
  submittion_file varchar(72) DEFAULT NULL,
  submittion_companyname varchar(32) DEFAULT NULL,
  submittion_created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);

comment on table submittions is 'Form submittions from clients';


create table project_types(
  project_type_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  project_type_name varchar(128),
  project_type_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);

create unique index project_types_idx on project_types(lower(project_type_name));

CREATE TABLE projects(
  project_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  project_visible boolean DEFAULT TRUE,
  project_image varchar(4096) NOT NULL,
  project_type int NOT NULL REFERENCES project_types(project_type_id),
  project_techs int[] not null,
  project_client varchar(128) not null,
  project_team smallint not null,
  project_platforms varchar(256) not null,
  project_industry varchar(256) not null,
  project_time bigint not null,

  project_release int not null check(project_release <=date_part('year', now())),

  project_title_uz varchar(256) NOT NULL,
  project_title_ru varchar(256) NOT NULL,
  project_title_en varchar(256) NOT NULL,

  project_subtitle_uz varchar(256) NOT NULL,
  project_subtitle_ru varchar(256) NOT NULL,
  project_subtitle_en varchar(256) NOT NULL,

  project_overview_uz varchar(2056) not null,
  project_overview_ru varchar(2056) not null,
  project_overview_en varchar(2056) not null,

  project_idea_uz varchar(1028) not null,
  project_idea_ru varchar(1028) not null,
  project_idea_en varchar(1028) not null,

  project_audience_uz varchar(1028) not null,
  project_audience_ru varchar(1028) not null,
  project_audience_en varchar(1028) not null,

  project_challenges_uz varchar(256)[] not null,
  project_challenges_ru varchar(256)[] not null,
  project_challenges_en varchar(256)[] not null,

  project_result_uz varchar(1028) not null,
  project_result_ru varchar(1028) not null,
  project_result_en varchar(1028) not null,

  project_gplay_link varchar(1028) not null,
  project_appstore_link varchar(1028) not null,
  project_web_link varchar(1028) not null,
  project_old_img_src varchar(4096) not null,
  project_new_img_src varchar(4096) not null,
  project_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);


CREATE TABLE professions(
  profession_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  profession_name varchar(128) NOT NULL,
  profession_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);

create unique index professions_uniq_idx on professions(lower(profession_name));

comment on table professions is 'Professions';


CREATE TABLE members(
  member_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
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
  service_added_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);

comment on table services is 'What services we offer';

create type techtype as enum('backend', 'frontend', 'mobile', 'database', 'design');

CREATE TABLE technologies(
  technology_id INT GENERATED BY default as identity PRIMARY KEY,
  technology_name varchar(64) NOT NULL,
  technology_type techtype NOT NULL,
  technology_image varchar(4096) NOT NULL,
  technology_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);

create table faq(faq_id serial not null,
  faq_question_uz varchar(1028) not null,
  faq_answer_uz varchar(1028) not null,
  faq_question_ru varchar(1028) not null,
  faq_answer_ru varchar(1028) not null,
  faq_question_en varchar(1028) not null,
  faq_answer_en varchar(1028) not null,
  faq_date timestamp not null default current_timestamp);




CREATE TABLE blogs(blog_id int generated by default as identity PRIMARY KEY,
  blog_body_uz json,
  blog_body_ru json,
  blog_body_en json,
  blog_created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP );

  create table faq(
  faq_id serial not null,
  faq_question_uz varchar(1028) not null,
  faq_answer_uz varchar(1028) not null,
  faq_question_ru varchar(1028) not null,
  faq_answer_ru varchar(1028) not null,
  faq_question_en varchar(1028) not null,
  faq_answer_en varchar(1028) not null,
  faq_date timestamp not null default current_timestamp
);

create table partners (
partner_id serial not null,
partner_link varchar(1028) not null,
partner_title varchar(512) not null, 
partner_img varchar(4096) not null,
partner_date timestamp not null default current_timestamp
);