CREATE DATABASE datbase2;


CREATE TABLE bileasy(
employer_id SERIAL PRIMARY KEY,
employer_name VARCHAR(250),
employer_age INTEGER,
employer_gender VARCHAR(250),
department_id INTEGER 
);





CREATE TABLE department_table(
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(250),
  department_id INT,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  employer_id INTEGER,
  CONSTRAINT fk_employer
  FOREIGN KEY (employer_id) REFERENCES bileasy(employer_id) ON DELETE CASCADE
);