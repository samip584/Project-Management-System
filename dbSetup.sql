DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
	emp_id SERIAL NOT NULL PRIMARY KEY,
	emp_name VARCHAR(100) NOT NULL,
	password VARCHAR(150) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	role VARCHAR(50) NOT NULL,
	salt VARCHAR(100) NOT NULL);

INSERT into employees (emp_name, password, email, role, salt)
VALUES
('Admin','bc9b406a98bc4fe7ac6970e1065e65a6141a28422d65a4a4e3925f89a1bdbe1845cca651c2a10754a89cc5769f7d8e0bad54a09d6cc24afc911964d447895aa5','admin@lf.com','admin','0b54393165d91a3c');


DROP TABLE IF EXISTS projects;

CREATE TABLE projects(
	project_id SERIAL NOT NULL PRIMARY KEY,
	title VARCHAR(100) NOT NULL UNIQUE,
	description VARCHAR(500) NOT NULL,
	project_manager INT NOT NULL REFERENCES employees(emp_id));


DROP TABLE IF EXISTS employee_projects;

CREATE TABLE employee_projects(
	emp_id INT NOT NULL REFERENCES employees(emp_id),
	project_id INT NOT NULL REFERENCES projects(project_id));

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
	task_id SERIAL NOT NULL PRIMARY KEY,
	title VARCHAR(100) NOT NULL UNIQUE,
	description VARCHAR(500) NOT NULL,
	assignee INT REFERENCES employees(emp_id),
	project INT NOT NULL REFERENCES projects(project_id),
	deadline DATE NOT NULL
);


DROP TABLE IF EXISTS task_tags;

CREATE TABLE task_tags(
	emp_id INT NOT NULL REFERENCES employees(emp_id),
	task_id INT NOT NULL REFERENCES tasks(task_id));

DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
	comment_id SERIAL NOT NULL PRIMARY KEY,
	comment VARCHAR(500) NOT NULL,
	commenter INT NOT NULL REFERENCES employees(emp_id),
	task INT NOT NULL REFERENCES tasks(task_id));



