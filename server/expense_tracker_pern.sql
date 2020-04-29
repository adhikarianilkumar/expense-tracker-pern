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