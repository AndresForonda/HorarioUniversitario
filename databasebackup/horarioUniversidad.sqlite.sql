BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `Users` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`email`	VARCHAR ( 255 ) UNIQUE,
	`password`	VARCHAR ( 255 ),
	`status`	VARCHAR ( 255 ),
	`createdAt`	DATETIME NOT NULL,
	`updatedAt`	DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `Subjects` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`semester`	SMALLINT NOT NULL,
	`subject`	VARCHAR ( 255 ) NOT NULL,
	`lowerSubject`	VARCHAR ( 255 ) NOT NULL UNIQUE,
	`createdAt`	DATETIME NOT NULL,
	`updatedAt`	DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `Songs` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`title`	VARCHAR ( 255 ),
	`artist`	VARCHAR ( 255 ),
	`genre`	VARCHAR ( 255 ),
	`album`	VARCHAR ( 255 ),
	`albumImageUrl`	VARCHAR ( 255 ),
	`youtubeId`	VARCHAR ( 255 ),
	`lyrics`	TEXT,
	`tab`	TEXT,
	`createdAt`	DATETIME NOT NULL,
	`updatedAt`	DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `Semesters` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`semester`	INTEGER NOT NULL UNIQUE,
	`grupoA`	TINYINT ( 1 ) NOT NULL,
	`grupoB`	TINYINT ( 1 ) NOT NULL,
	`grupoC`	TINYINT ( 1 ) NOT NULL,
	`createdAt`	DATETIME NOT NULL,
	`updatedAt`	DATETIME NOT NULL
);
INSERT INTO `Semesters` VALUES (1,1,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (2,2,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (3,3,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (4,4,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (5,5,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (6,6,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (7,7,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (8,8,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (9,9,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (10,10,0,0,0,'01:55:21','01:55:21');
INSERT INTO `Semesters` VALUES (11,11,1,1,1,'01:56:00','01:56:00');
COMMIT;

-- INSERT INTO `Semesters`(`id`,`semester`,`grupoA`,`grupoB`,`grupoC`,`createdAt`,`updatedAt`) VALUES (NULL,1,false,false,false,time(),time()),(NULL,2,false,false,false,time(),time()),(NULL,3,false,false,false,time(),time()),(NULL,4,false,false,false,time(),time()),(NULL,5,false,false,false,time(),time()),(NULL,6,false,false,false,time(),time()),(NULL,7,false,false,false,time(),time()),(NULL,8,false,false,false,time(),time()),(NULL,9,false,false,false,time(),time()),(NULL,10,false,false,false,time(),time())

