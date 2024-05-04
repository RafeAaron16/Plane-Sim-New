CREATE DATABASE IF NOT EXISTS myusers;

USE myusers;

CREATE TABLE IF NOT EXISTS user(id INT PRIMARY KEY AUTO_INCREMENT UNIQUE ,Name VARCHAR(40), AMOUNT INT);

INSERT INTO user VALUES("Rafe Aaron", 100000);
INSERT INTO user VALUES("Bill Ivan", 50000);

CREATE TABLE IF NOT EXISTS currentbets(Name VARCHAR(40), BetAmount INT);

CREATE TABLE IF NOT EXISTS mybets(Name VARCHAR(40), BetAmount INT);

INSERT INTO mybets VALUES("Rafe Aaron", 40000);
INSERT INTO mybets VALUES("Rafe Aaron", 34000);
INSERT INTO mybets VALUES("Rafe Aaron", 65000);
INSERT INTO mybets VALUES("Rafe Aaron", 5000);
INSERT INTO mybets VALUES("Rafe Aaron", 2000);
INSERT INTO mybets VALUES("Bill Ivan", 43000);
INSERT INTO mybets VALUES("Bill Ivan", 40400);

