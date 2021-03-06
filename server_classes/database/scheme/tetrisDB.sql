
-- Author: Jose Ortiz
-- Thu Oct 27 11:55:27 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering


-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(12) NOT NULL,
  score INT NOT NULL DEFAULT 0 );


-- -----------------------------------------------------
-- Table `mydb`.`Games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Games (
  id SERIAL NOT NULL,
  player1 INT NOT NULL,
  player2 INT NULL,
  gamename VARCHAR(45) NULL,
  isFull INT NULL DEFAULT 0,
  totalscore INT NULL DEFAULT 0,
  winner INT NULL,
  constraint fk_users
     foreign key (player1)
     REFERENCES Users (id)
	 ON DELETE CASCADE
     ON UPDATE CASCADE);







