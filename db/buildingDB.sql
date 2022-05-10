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
-- Table structure for table `contractors`
--

DROP TABLE IF EXISTS `contractors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contractors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contractor_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `contractor_work_details` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `contractor_work_unit` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `contractor_work_quantity` int(11) DEFAULT NULL,
  `contractor_unit_price` decimal(10,2) DEFAULT NULL,
  `contractor_work_total` decimal(10,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contractors_projects1_idx` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractors`
--

LOCK TABLES `contractors` WRITE;
/*!40000 ALTER TABLE `contractors` DISABLE KEYS */;
INSERT INTO `contractors` VALUES (1,'Ehab','صبة 50 متر','متر مربع',50,20000.00,1000000.00,10),(2,'عاصم','بناء 5 دور','مقطوعية',NULL,NULL,235345.00,10);
/*!40000 ALTER TABLE `contractors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `employee_job` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `employee_phone_num` varchar(13) CHARACTER SET utf8 DEFAULT NULL,
  `employee_day_price` decimal(11,2) DEFAULT NULL,
  `employee_start_date` date DEFAULT NULL,
  `employee_end_date` date DEFAULT NULL,
  `employee_total` decimal(60,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employees_projects1_idx` (`project_id`),
  CONSTRAINT `fk_employees_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (9,'Asem','Programmer','+967775690990',5000.00,'2022-05-04','2022-05-19',15.00,10),(10,'Ehab','Man','+966564080144',3000.00,'2022-05-01','2022-07-06',198000.00,10),(11,'Ehab','Man','+966564080144',2000.00,'2022-05-18','2022-05-18',0.00,11),(12,'ASEM F. ALHAIDARI','البطل','+967775690990',3000.00,'2022-05-10','2022-05-08',-6000.00,11),(13,'Father','Man','+966564080144',3000.00,'2022-05-23','2022-06-08',48000.00,11);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extras`
--

DROP TABLE IF EXISTS `extras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `extra_time` decimal(10,2) DEFAULT NULL,
  `extra_time_price` decimal(10,2) DEFAULT NULL,
  `extra_total_price` decimal(10,2) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_extras_employees1_idx` (`employee_id`),
  CONSTRAINT `fk_extras_employees1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extras`
--

LOCK TABLES `extras` WRITE;
/*!40000 ALTER TABLE `extras` DISABLE KEYS */;
INSERT INTO `extras` VALUES (2,5.00,3000.00,15000.00,NULL),(4,43.00,433.00,18619.00,NULL),(5,6.00,5000.00,30000.00,NULL);
/*!40000 ALTER TABLE `extras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_name` varchar(200) DEFAULT NULL,
  `invoice_details` varchar(200) DEFAULT NULL,
  `invoice_number` int(11) DEFAULT NULL,
  `invoice_unit` varchar(200) DEFAULT NULL,
  `invoice_unit_price` decimal(20,2) DEFAULT NULL,
  `invoice_unit_qantity` int(11) DEFAULT NULL,
  `invoice_total` decimal(20,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoices_projects1_idx` (`project_id`),
  CONSTRAINT `fk_invoices_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(45) DEFAULT NULL,
  `manager_outlay_details` varchar(200) DEFAULT NULL,
  `manager_outlay_amount` decimal(10,2) DEFAULT NULL,
  `manager_outlay_date` date DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_managers_outlays_projects1_idx` (`project_id`),
  CONSTRAINT `fk_managers_outlays_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
INSERT INTO `managers` VALUES (1,'Asemhrth','hdfhfshfd',666666.00,'2022-05-09',10);
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(40) DEFAULT NULL,
  `project_address` varchar(40) DEFAULT NULL,
  `project_start_date` varchar(40) DEFAULT NULL,
  `project_end_date` varchar(40) DEFAULT NULL,
  `user_id` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projects_users_idx` (`user_id`),
  CONSTRAINT `fk_projects_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (10,'Asem\'s house','King Faisal Rd','2022-05-03','2022-06-01',9),(11,'Asem\'s house','King Faisal Rd','2022-05-09','2022-05-10',10);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `purchase_details` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `purchase_type` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `purchase_unit_price` decimal(20,2) DEFAULT NULL,
  `purchase_unit_quantity` int(11) DEFAULT NULL,
  `purchase_total` decimal(20,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchases_projects1_idx` (`project_id`),
  CONSTRAINT `fk_purchases_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (8,'Asem','nhfgjgdj','cash',31.00,231321,7170951.00,10),(9,'gegdf','hnhsdfdfhsdhsdh','cash',21.00,32,672.00,10),(10,'hh','ngnsfgns','postponed',34.00,23,782.00,10);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statements`
--

DROP TABLE IF EXISTS `statements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statements` (
  `id` int(11) NOT NULL,
  `statement_unit` varchar(45) DEFAULT NULL,
  `statement_unit_price` decimal(20,2) DEFAULT NULL,
  `statement_unit_quantity` varchar(45) DEFAULT NULL,
  `contractor_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_id_idx` (`contractor_id`),
  KEY `fk_statements_employees1_idx` (`employee_id`),
  CONSTRAINT `fk_statements_employees1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statements`
--

LOCK TABLES `statements` WRITE;
/*!40000 ALTER TABLE `statements` DISABLE KEYS */;
/*!40000 ALTER TABLE `statements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2022-05-11  0:28:05
