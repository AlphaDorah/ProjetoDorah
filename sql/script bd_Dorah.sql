-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_Dorah
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS bd_Dorah DEFAULT CHARACTER SET utf8 ;

USE bd_Dorah ;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_usuario(
  tb_usuario_id INT NOT NULL AUTO_INCREMENT,
  tb_usuario_login VARCHAR(10) NOT NULL,
  tb_usuario_senha VARCHAR(10) NOT NULL,
  tb_usuario_email VARCHAR(45) NOT NULL,
  tb_usuario_foto MEDIUMBLOB,
  PRIMARY KEY (tb_usuario_id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_colecao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_colecao(
  tb_colecao_id INT NOT NULL AUTO_INCREMENT,
  tb_colecao_nome VARCHAR(45) NOT NULL,
  tb_usuario_id INT NOT NULL,
  PRIMARY KEY (tb_colecao_id),
  CONSTRAINT usuario_fk_colecao_pk
    FOREIGN KEY (tb_usuario_id)
    REFERENCES tb_usuario(tb_usuario_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_FlashCard`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_FlashCard(
  tb_FlashCard_id INT NOT NULL AUTO_INCREMENT,
  tb_FlashCard_arq MEDIUMBLOB NOT NULL,
  tb_colecao_id INT NOT NULL,
  PRIMARY KEY (tb_FlashCard_id),
  CONSTRAINT FlashCard_fk_colecao_pk
    FOREIGN KEY (tb_colecao_id)
    REFERENCES tb_colecao(tb_colecao_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_MapaMental`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_MapaMental(
  tb_MapaMental_id INT NOT NULL AUTO_INCREMENT,
  tb_MapaMental_nome VARCHAR(45) NOT NULL,
  tb_MapaMental_arq MEDIUMBLOB NOT NULL,
  tb_usuario_id INT NOT NULL,
  PRIMARY KEY (tb_MapaMental_id),
  CONSTRAINT MapaMental_fk_usuario_pk
    FOREIGN KEY (tb_usuario_id)
    REFERENCES tb_usuario(tb_usuario_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_tags(
  tb_tags_id INT NOT NULL AUTO_INCREMENT,
  tb_tags_nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tb_tags_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_tags_MapaMental`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_tags_MapaMental(
  tb_tags_id INT NOT NULL,
  tb_MapaMental_id INT NOT NULL,
  PRIMARY KEY (tb_tags_id, tb_MapaMental_id),
  CONSTRAINT tags_MapaMental_fk_tags_pk
    FOREIGN KEY (tb_tags_id)
    REFERENCES tb_tags(tb_tags_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT tags_MapaMental_fk_MapaMental_pk
    FOREIGN KEY (tb_MapaMental_id)
    REFERENCES tb_MapaMental(tb_MapaMental_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bd_Dorah`.`tb_tags_FlashCard`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tb_tags_FlashCard(
  tb_FlashCard_id INT NOT NULL,
  tb_tags_id INT NOT NULL,
  PRIMARY KEY (tb_FlashCard_id, tb_tags_id),
  CONSTRAINT FlashCard_tags_fk_FlashCard_pk
    FOREIGN KEY (tb_FlashCard_id)
    REFERENCES tb_FlashCard(tb_FlashCard_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT FlashCard_tags_fk_tags_pk
    FOREIGN KEY (tb_tags_id)
    REFERENCES tb_tags(tb_tags_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
