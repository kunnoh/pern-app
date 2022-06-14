CREATE DATABASE schmanage;
GRANT ALL PRIVILEGES ON DATABASE schmanage TO postgres;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  email varchar (100) NOT NULL,
  firstname varchar (100) NOT NULL,
  lastname varchar (100) NOT NULL,
  created_at date
);