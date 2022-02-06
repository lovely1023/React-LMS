/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - isteacher
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`isteacher` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;

USE `isteacher`;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` char(41) NOT NULL,
  `password2` char(41) NOT NULL,
  `title` varchar(60) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `billsAccess` enum('Y','N') NOT NULL DEFAULT 'Y',
  `billsDelete` enum('Y','N') NOT NULL DEFAULT 'Y',
  `billsEdit` enum('Y','N') NOT NULL DEFAULT 'Y',
  `billsSearch` enum('Y','N') NOT NULL DEFAULT 'Y',
  `usersAccess` enum('Y','N') NOT NULL DEFAULT 'Y',
  `usersEdit` enum('Y','N') NOT NULL DEFAULT 'Y',
  `studentEdit` enum('Y','N') NOT NULL DEFAULT 'Y',
  `studentDelete` enum('Y','N') NOT NULL DEFAULT 'N',
  `studentStatus` enum('Y','N') NOT NULL DEFAULT 'Y',
  `tbStock` enum('Y','N') NOT NULL DEFAULT 'Y',
  `addObs` enum('Y','N') NOT NULL DEFAULT 'N',
  `viewAllObs` enum('Y','N') NOT NULL DEFAULT 'N',
  `deleteObs` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`password`,`password2`,`title`,`fullName`,`billsAccess`,`billsDelete`,`billsEdit`,`billsSearch`,`usersAccess`,`usersEdit`,`studentEdit`,`studentDelete`,`studentStatus`,`tbStock`,`addObs`,`viewAllObs`,`deleteObs`) values 
(12,'Jaime','*7213DDBD1CEA13F0684C753713532726FB13AD18','','Coordinador del centro','Jaime Cerezo Alberdi','N','N','N','N','N','N','N','N','N','N','N','N','N'),
(13,'Leila','*0A6BAC1249FCC459DA01554CE48E2B5031E71EBA','','Manager','Leila Seif','Y','Y','Y','Y','N','N','Y','N','N','N','Y','Y','N'),
(14,'Marco','*1F0397FFF37911CE50EE59C3E30B46C6AF9DA556','','Director','Leila Seif Saif','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'),
(16,'Nicholas','*7C11F997750CB061828DB86733FEA1F31ED19009','','','','N','N','N','N','N','N','N','N','N','N','Y','Y','N'),
(18,'isUser','*883580CC9C7937844B246695E127F1B4EF5A1753','','','','Y','Y','Y','Y','N','N','Y','N','Y','N','N','N','N'),
(26,'Alfredo','*84AAC12F54AB666ECFC2A83C676908C8BBC381B1','0192023a7bbd73250516f069df18b500','certificate_test_title','certificate_test_username','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'),
(20,'AutoSender','*37E915A9A1DDEAE19B3D99493CC384BAFB54E6A1','','','','N','N','N','N','N','N','N','N','N','N','N','N','N'),
(27,'Tom','*2E38997FF63EAC0C6D36D0BD81DB3C5FDDD68BF4','','','','N','N','N','N','N','N','N','N','N','N','N','N','N'),
(25,'Danni','*3C2C018294DF31AFB43D653487BD76F4678EC923','','Coordinadora del Centro','Danyeal Roseman','N','N','N','N','N','N','N','N','N','N','N','N','N'),
(28,'Ben','*98B6CF5DB28581C27C37B1C20CE8652F768EBBDB','','Coordinador del centro','Ben Watson','Y','N','Y','N','N','N','Y','N','N','Y','N','Y','N'),
(29,'Oran','*CBC1BE1792DF8A457A8560DFC4D5426603A72BD1','','','','N','N','N','N','N','N','N','N','N','N','N','N','N');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
