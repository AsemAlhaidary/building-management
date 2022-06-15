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
  `contractor_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `contractor_work_details` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `contractor_work_unit` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `contractor_work_quantity` int(12) DEFAULT NULL,
  `contractor_unit_price` decimal(50,2) DEFAULT NULL,
  `contractor_work_total` decimal(50,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contractors_projects1_idx` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractors`
--

LOCK TABLES `contractors` WRITE;
/*!40000 ALTER TABLE `contractors` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contractorsdeposits`
--

DROP TABLE IF EXISTS `contractorsdeposits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contractorsdeposits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deposit_method` varchar(100) DEFAULT NULL,
  `deposit_date` date DEFAULT NULL,
  `deposit_price` decimal(50,2) DEFAULT NULL,
  `contractor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  CONSTRAINT `contractor_id` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractorsdeposits`
--

LOCK TABLES `contractorsdeposits` WRITE;
/*!40000 ALTER TABLE `contractorsdeposits` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractorsdeposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposits`
--

DROP TABLE IF EXISTS `deposits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deposit_method` varchar(100) DEFAULT NULL,
  `deposit_date` date DEFAULT NULL,
  `deposit_price` decimal(50,2) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `employee_job` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `employee_phone_num` varchar(13) CHARACTER SET utf8 DEFAULT NULL,
  `employee_day_price` decimal(50,2) DEFAULT NULL,
  `employee_start_date` date DEFAULT NULL,
  `employee_end_date` date DEFAULT NULL,
  `employee_total` decimal(50,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employees_projects1_idx` (`project_id`),
  CONSTRAINT `fk_employees_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (42,'الازرق','عامل','0',8000.00,'2022-04-04','2022-04-04',8000.00,13),(43,'سامي','عامل دفن','0',8000.00,'2022-04-05','2022-04-05',8000.00,13),(44,'صاحب الازرق','عامل','0',8000.00,'2022-04-04','2022-04-04',8000.00,13),(45,'سامي الدفن','عامل','0',50000.00,'2022-04-05','2022-04-05',50000.00,13),(46,'مجيب','مهندس ','0',30000.00,'2022-04-06','2022-04-06',30000.00,13),(47,'الكهربائي','كهربائي','',30000.00,'2022-04-06','2022-04-06',30000.00,13),(48,'عامل براني','عامل','0',7000.00,'2022-04-06','2022-04-06',7000.00,13),(49,'عامل براني','عامل','0',7000.00,'2022-04-06','2022-04-06',7000.00,13),(50,'عامل براني','عامل','0',7000.00,'2022-04-06','2022-04-06',7000.00,13),(51,'عامل براني','عامل','0',7000.00,'2022-04-06','2022-04-06',7000.00,13);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments`
--

DROP TABLE IF EXISTS `equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `equipment_details` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `equipment_date` date DEFAULT NULL,
  `equipment_unit_price` decimal(50,2) DEFAULT NULL,
  `equipment_unit_quantity` decimal(50,2) DEFAULT NULL,
  `equipment_total` decimal(50,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_equipments_projects1_idx` (`project_id`),
  CONSTRAINT `fk_equipments_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (1,'شيول','مقطوعية مسح ورفع المخلفات امام الفيلا ','2022-04-04',700000.00,1.00,700000.00,13),(2,'بكلين ','','2022-04-05',40000.00,11.00,440000.00,13),(3,'البكلين العرجاء','','2022-04-13',25000.00,8.00,200000.00,13),(4,'بب كات','','2022-04-27',17000.00,7.00,119000.00,13);
/*!40000 ALTER TABLE `equipments` ENABLE KEYS */;
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
  `extra_time_price` decimal(50,2) DEFAULT NULL,
  `extra_total_price` decimal(50,2) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_extras_employees1_idx` (`employee_id`),
  CONSTRAINT `fk_extras_employees1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extras`
--

LOCK TABLES `extras` WRITE;
/*!40000 ALTER TABLE `extras` DISABLE KEYS */;
INSERT INTO `extras` VALUES (1,4.00,4000.00,16000.00,42);
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
  `invoice_name` varchar(100) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `invoice_details` varchar(200) DEFAULT NULL,
  `invoice_number` int(11) DEFAULT NULL,
  `invoice_unit_price` decimal(50,2) DEFAULT NULL,
  `invoice_unit_quantity` int(11) DEFAULT NULL,
  `invoice_type` varchar(100) DEFAULT NULL,
  `invoice_total` decimal(50,2) DEFAULT NULL,
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
  `manager_name` varchar(100) DEFAULT NULL,
  `manager_outlay_details` varchar(200) DEFAULT NULL,
  `manager_outlay_amount` decimal(50,2) DEFAULT NULL,
  `manager_outlay_date` date DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_managers_outlays_projects1_idx` (`project_id`),
  CONSTRAINT `fk_managers_outlays_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outlays`
--

DROP TABLE IF EXISTS `outlays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outlays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `outlay_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `outlay_details` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `outlay_date` date DEFAULT NULL,
  `outlay_unit_price` decimal(50,2) DEFAULT NULL,
  `outlay_unit_quantity` int(11) DEFAULT NULL,
  `outlay_total` decimal(50,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_outlays_projects1_idx` (`project_id`),
  CONSTRAINT `fk_outlays_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outlays`
--

LOCK TABLES `outlays` WRITE;
/*!40000 ALTER TABLE `outlays` DISABLE KEYS */;
/*!40000 ALTER TABLE `outlays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentsservice`
--

DROP TABLE IF EXISTS `paymentsservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentsservice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payments_amount` decimal(10,2) DEFAULT NULL,
  `payments_date` date DEFAULT NULL,
  `payments_details` varchar(200) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payments_project_idx` (`project_id`),
  CONSTRAINT `fk_payments_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentsservice`
--

LOCK TABLES `paymentsservice` WRITE;
/*!40000 ALTER TABLE `paymentsservice` DISABLE KEYS */;
INSERT INTO `paymentsservice` VALUES (8,1240000.00,'2022-04-01','عهده على ذمة تسريع الاعمال لمشروع حوش المؤسسة',13),(9,2068000.00,'2022-04-05','عهدة علي ذمة تسريع الاعمال لحوش المؤسسة',13),(10,4875000.00,'2022-04-06','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(11,2000000.00,'2022-04-07','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(12,2000000.00,'2022-04-09','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(13,4000000.00,'2022-04-09','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(14,2630000.00,'2022-04-15','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(15,1761000.00,'2022-04-15','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(17,945500.00,'2022-04-15','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(18,1305000.00,'2022-04-16','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(19,1500000.00,'2022-04-16','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(20,1000000.00,'2022-04-18','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(21,1622000.00,'2022-04-20','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(22,1550000.00,'2022-04-22','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(23,200000.00,'2022-04-22','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(24,3000000.00,'2022-04-24','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(25,1700000.00,'2022-04-25','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(26,3000000.00,'2022-04-26','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(27,1933000.00,'2022-04-28','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(28,1500000.00,'2022-04-29','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(29,1000000.00,'2022-04-29','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13),(30,2000000.00,'2022-05-01','الفجر',13),(31,200000.00,'2022-05-10','يوم العودة الي المفرقة بعد اجازة العيد',13),(33,1000000.00,'2022-05-11','عصراً',13),(34,1000000.00,'2022-05-14','بعد المغرب',13),(35,1000000.00,'2022-05-14','عصراً',13),(36,270000.00,'2022-05-14','',13),(37,3000000.00,'2022-04-26','عهدة على ذمة تسريع الاعمال لحوش المؤسسة',13);
/*!40000 ALTER TABLE `paymentsservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) DEFAULT NULL,
  `project_address` varchar(100) DEFAULT NULL,
  `project_start_date` date DEFAULT NULL,
  `project_end_date` date DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projects_users_idx` (`user_id`),
  CONSTRAINT `fk_projects_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (13,'عمارة علي عبده الله','الحوبان','2022-06-09','2022-06-09',11);
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
  `purchase_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `purchase_details` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `purchase_type` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `purchas_date` date DEFAULT NULL,
  `purchase_unit_price` decimal(50,2) DEFAULT NULL,
  `purchase_unit_quantity` int(11) DEFAULT NULL,
  `purchase_total` decimal(50,2) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchases_projects1_idx` (`project_id`),
  CONSTRAINT `fk_purchases_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,'نيس','','postponed',NULL,35000.00,2,70000.00,13);
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
  `statement_unit` varchar(100) DEFAULT NULL,
  `statement_unit_price` decimal(50,2) DEFAULT NULL,
  `statement_unit_quantity` decimal(50,2) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Ehab Tawfic','Ehab@T','$2b$10$2UezDswenU/d6qhDXaDbqOYugWAihIv6A9enG97yI0nGiHTOInDR6');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-13 21:38:24
