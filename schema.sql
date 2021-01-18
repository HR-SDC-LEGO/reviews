DROP DATABASE IF EXISTS FEC;

CREATE DATABASE FEC;

USE FEC;

CREATE TABLE reviewList (
  id INT NOT NULL AUTO_INCREMENT,
  date_create DATE NOT NULL,
  overall_rate INT NOT NULL,
  username VARCHAR(2555) NOT NULL,
  age INT(200) NOT NULL,
  recommend BOOLEAN,
  purchase_for VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  play_experience INT,
  level_difficulty INT,
  value_for_money INT,
  build_time INT,
  building_experience VARCHAR(255),
  helpful_yes INT,
  helpful_no INT,
  image1 VARCHAR(255),
  image2 VARCHAR(255),
  image3 VARCHAR(255),
  image4 VARCHAR(255),
  image5 VARCHAR(255),
  product_id INT NOT NULL,
  users_id INT NOT NULL,
  lego_reply TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);