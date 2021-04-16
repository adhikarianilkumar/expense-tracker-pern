/* Execute below query only once*/
CREATE DATABASE expense_tracker_pern;

/* Uncomment and execute below query to install extension uuid-ossp*/
/* CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; */

/* Create table expense_details and insert some data*/
DROP TABLE IF EXISTS expense_details;
CREATE TABLE expense_details(
  id uuid DEFAULT uuid_generate_v4(),
  text VARCHAR(255) NOT NULL,
  amount NUMERIC(19, 2) NOT NULL,
  PRIMARY KEY(id)
);
insert into expense_details (text, amount) 
values 
	('Cadillac', '67755.31'),
	('Ford', '89028.21'),
	('Pontiac', '89970.12'),
	('Mitsubishi', '89911.92'),
	('BMW', '-30367.76');


DROP TABLE IF EXISTS user_registration;
CREATE TABLE user_registration(
  id uuid DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

DROP TABLE IF EXISTS user_security_questions;
CREATE TABLE user_security_questions(
  id uuid DEFAULT uuid_generate_v4(),
  security_question VARCHAR(1000) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  PRIMARY KEY(id)
);