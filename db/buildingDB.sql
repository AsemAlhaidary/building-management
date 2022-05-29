-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: building_management
-- ------------------------------------------------------
-- Server version	5.7.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `contractors`
--

LOCK TABLES `contractors` WRITE;
/*!40000 ALTER TABLE `contractors` DISABLE KEYS */;
INSERT INTO `contractors` VALUES (1,'Ehab','صبة 50 متر','متر مربع',50,20000.00,1000000.00,10),(2,'عاصم','بناء 5 دور','مقطوعية',NULL,NULL,235345.00,10);
/*!40000 ALTER TABLE `contractors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contractorsdeposits`
--

LOCK TABLES `contractorsdeposits` WRITE;
/*!40000 ALTER TABLE `contractorsdeposits` DISABLE KEYS */;
INSERT INTO `contractorsdeposits` VALUES (1,'قبض','2022-05-29',2000.00,1),(2,'قبض','2022-05-29',6000.00,1),(4,'قبض','2022-05-12',150000.00,1),(5,'صرف','2022-05-27',-200004.00,1);
/*!40000 ALTER TABLE `contractorsdeposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
INSERT INTO `deposits` VALUES (6,'صرف','2022-05-05',-43432.00,9),(7,'صرف','2022-05-13',-3222.00,9),(8,'قبض','2022-05-20',50000.00,9),(9,'قبض','2022-05-12',50000.00,9),(10,'صرف','2022-05-17',-50000.00,9),(11,'صرف','2022-05-18',-6000.00,9),(12,'صرف','2022-05-19',-1000.00,9),(13,'صرف','2022-05-18',-1000.00,9),(14,'قبض','2022-05-03',2000.00,9),(15,'قبض','2022-05-11',1000.00,9),(16,'قبض','2022-05-12',10000.00,9),(17,'قبض','2022-05-11',100.00,9),(18,'قبض','2022-05-12',4343.00,15);
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (9,'Asem','Programmer','+967775690990',5000.00,'2022-05-04','2022-05-19',15.00,10),(10,'Ehab','Man','+966564080144',3000.00,'2022-05-01','2022-07-06',198000.00,10),(11,'Ehab','Man','+966564080144',2000.00,'2022-05-18','2022-05-18',0.00,11),(12,'ASEM F. ALHAIDARI','البطل','+967775690990',3000.00,'2022-05-10','2022-05-08',-6000.00,11),(13,'Father','Man','+966564080144',3000.00,'2022-05-23','2022-06-08',48000.00,11),(14,'هاني','ماني','967979483',4000.00,'2022-05-03','2022-05-31',112000.00,10),(15,'Ehab','Programmer','+966564080144',634.00,'2022-05-12','2022-05-23',6974.00,10),(16,'Waheeb','ENG','+966564080144',30000.00,'2022-05-26','2022-05-26',30000.00,10);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `extras`
--

LOCK TABLES `extras` WRITE;
/*!40000 ALTER TABLE `extras` DISABLE KEYS */;
INSERT INTO `extras` VALUES (2,5.00,3000.00,15000.00,NULL),(4,43.00,433.00,18619.00,NULL),(5,6.00,5000.00,30000.00,NULL),(6,4.00,2000.00,8000.00,10),(7,4.00,34032.00,136128.00,9),(8,7.00,345235.00,2416645.00,14);
/*!40000 ALTER TABLE `extras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (4,'dj;asj','2022-05-11','jfd;wjef;j',43,'432',3423.00,4324,'postponed',14801052.00,10);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
INSERT INTO `managers` VALUES (1,'Asemhrth','hdfhfshfd',666666.00,'2022-05-09',10);
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `outlays`
--

LOCK TABLES `outlays` WRITE;
/*!40000 ALTER TABLE `outlays` DISABLE KEYS */;
INSERT INTO `outlays` VALUES (1,'sfsdaf','fdsdfsd','2022-05-30',43324.00,432,18715968.00,10),(2,'fvsd','gfdggfdfsa','2022-05-16',34.00,5324,181016.00,10);
/*!40000 ALTER TABLE `outlays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (10,'Asem\'s house','King Faisal Rd','2022-05-03','2022-06-01',9),(11,'Asem\'s house','King Faisal Rd','2022-05-09','2022-05-10',10);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (8,'Asem','nhfgjgdj','cash',NULL,31.00,231321,7170951.00,10),(9,'gegdf','hnhsdfdfhsdhsdh','cash',NULL,21.00,32,672.00,10),(10,'hh','ngnsfgns','postponed',NULL,34.00,23,782.00,10);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `statements`
--

LOCK TABLES `statements` WRITE;
/*!40000 ALTER TABLE `statements` DISABLE KEYS */;
/*!40000 ALTER TABLE `statements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Asem','asem@alhaidary','$2b$10$tbD1S.2PcxtPOblQ6wwRZ.KdMJtBIhvpEEam4M8tcmRgoyBsYONHu'),(10,'Ehab','eh@E','$2b$10$VlFLJNhu.yO9cOj.MzQmg.tBL2/GAtJMZSSF/8XmsnY06bP54xokO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'building_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-30  1:00:09
