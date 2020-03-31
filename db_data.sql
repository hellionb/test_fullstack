-- MySQL Script generated by MySQL Workbench
-- lun. 30 mars 2020 16:26:21 CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_application
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_application
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_application` DEFAULT CHARACTER SET latin1 ;
USE `db_application` ;

-- -----------------------------------------------------
-- Table `db_application`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_application`.`project` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `amount` INT(11) NULL DEFAULT NULL,
  `description` VARCHAR(8191) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `owner_username` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 52
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `db_application`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_application`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO user (id, email, password, username, type ) VALUES
 (1, 'ana@ana', 'ana', 'Ana', 'ADMIN'),
 (2, 'david@david', 'david', 'David', 'STANDARD'),
 (3, 'jade@jade', 'jade', 'Jade', 'STANDARD'),
 (4, 'paul@paul', 'paul', 'Paul', 'STANDARD'),
 (5, 'bertrand@bertrand', 'bertrand', 'Bertrand', 'STANDARD');



INSERT INTO project (id, amount, description, name, owner_username ) VALUES
(1, 100, 'description 1', 'project 1', 'Ana'),
(2, 300, 'description 2', 'project 2', 'Ana'),
(3, 200, 'description 3', 'project 3', 'Ana'),
(4, 1200, 'description 4', 'project 4', 'Ana'),
(5, 2300, 'description 5', 'project 5', 'Ana'),

(6, 100, 'description 1', 'project 1', 'David'),
(7, 300, 'description 2', 'project 2', 'David'),
(8, 200, 'description 3', 'project 3', 'David'),
(9, 1200, 'description 4', 'project 4', 'David'),
(10, 2300, 'description 5', 'project 5', 'David'),

(11, 100, 'description 1', 'project 1', 'Jade'),
(12, 300, 'description 2', 'project 2', 'Jade'),
(13, 200, 'description 3', 'project 3', 'Jade'),
(14, 1200, 'description 4', 'project 4', 'Jade'),
(15, 2300, 'description 5', 'project 5', 'Jade'),

(16, 100, 'description 1', 'project 1', 'Paul'),
(17, 300, 'description 2', 'project 2', 'Paul'),
(18, 200, 'description 3', 'project 3', 'Paul'),
(19, 1200, 'description 4', 'project 4', 'Paul'),
(20, 2300, 'description 5', 'project 5', 'Paul'),

(21, 100, 'description 1', 'project 1', 'Bertrand'),
(22, 300, 'description 2', 'project 2', 'Bertrand'),
(23, 200, 'description 3', 'project 3', 'Bertrand'),
(24, 1200, 'description 4', 'project 4', 'Bertrand'),
(25, 2300, 'description 5', 'project 5', 'Bertrand');