CREATE DATABASE schmanage;
GRANT ALL PRIVILEGES ON DATABASE schmanage TO postgres;

\c schmanage

CREATE TABLE IF NOT EXISTS accounts (
	user_id serial PRIMARY KEY,
	firstname VARCHAR ( 50 ) NOT NULL,
	lastname VARCHAR ( 50 ) NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    last_login TIMESTAMP 
);

INSERT INTO accounts(user_id, firstname, lastname, password, email, created_on)
VALUES (DEFAULT, 'admin', 'admin', 'admin123', 'admin@a.m', '2022-06-11 03:14:07 UTC');

CREATE TABLE IF NOT EXISTS roles(
   role_id serial PRIMARY KEY,
   role_name VARCHAR (255) UNIQUE NOT NULL
);

INSERT INTO roles(role_name)
VALUES ('owner'),('editor'),('user');

CREATE TABLE IF NOT EXISTS account_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  grant_date TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id)
      REFERENCES roles (role_id),
  FOREIGN KEY (user_id)
      REFERENCES accounts (user_id)
);