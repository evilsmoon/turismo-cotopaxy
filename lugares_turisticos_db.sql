-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lugares_turisticos_db
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `name_administador` varchar(45) NOT NULL,
  `password_adminstrador` varchar(100) NOT NULL,
  `correo_administrador` varchar(45) NOT NULL,
  `telefono_administrador` varchar(45) NOT NULL,
  PRIMARY KEY (`id_administrador`),
  UNIQUE KEY `correo_administrador_UNIQUE` (`correo_administrador`)
) ENGINE=InnoDB AUTO_INCREMENT=1700000002 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1700000000,'ADM_2021','1','dbermeo1995@gmail.com','+593987654321');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anuncios`
--

DROP TABLE IF EXISTS `anuncios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anuncios` (
  `id_anuncios` int NOT NULL AUTO_INCREMENT,
  `id_emprendimiento` int NOT NULL,
  `id_emprendedor` int NOT NULL,
  `Nombre_Anuncio` varchar(200) NOT NULL,
  `detalle` varchar(600) NOT NULL,
  `fecha_inicio` varchar(50) NOT NULL,
  `fecha_fin` varchar(50) NOT NULL,
  PRIMARY KEY (`id_anuncios`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncios`
--

LOCK TABLES `anuncios` WRITE;
/*!40000 ALTER TABLE `anuncios` DISABLE KEYS */;
INSERT INTO `anuncios` VALUES (17,130,2,'Paseo','Paseo por los mejores lugares','2021-05-25T11:21','2021-05-25T11:21'),(18,131,2,'Descuentos','Descuentos por feriados','2021-05-25T11:24','2021-05-25T11:24');
/*!40000 ALTER TABLE `anuncios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canton_emprendimiento`
--

DROP TABLE IF EXISTS `canton_emprendimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canton_emprendimiento` (
  `id_canton` int NOT NULL AUTO_INCREMENT,
  `name_canton` varchar(45) NOT NULL,
  `provincia_emprendimiento_id_provincia` int NOT NULL,
  PRIMARY KEY (`id_canton`),
  KEY `fk_canton_emprendimiento_provincia_emprendimiento1_idx` (`provincia_emprendimiento_id_provincia`),
  CONSTRAINT `fk_canton_emprendimiento_provincia_emprendimiento1` FOREIGN KEY (`provincia_emprendimiento_id_provincia`) REFERENCES `provincia_emprendimiento` (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canton_emprendimiento`
--

LOCK TABLES `canton_emprendimiento` WRITE;
/*!40000 ALTER TABLE `canton_emprendimiento` DISABLE KEYS */;
INSERT INTO `canton_emprendimiento` VALUES (1,'Latacunga',1),(2,'La Maná',1),(3,'Pangua',1),(4,'Pujilí',1),(5,'Salcedo',1),(6,'Saquisilí',1),(7,'Sigchos',1),(8,'Quito',2);
/*!40000 ALTER TABLE `canton_emprendimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `consulta_anuncios`
--

DROP TABLE IF EXISTS `consulta_anuncios`;
/*!50001 DROP VIEW IF EXISTS `consulta_anuncios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consulta_anuncios` AS SELECT 
 1 AS `id_anuncios`,
 1 AS `id_emprendimiento`,
 1 AS `id_emprendedor`,
 1 AS `Nombre_Anuncio`,
 1 AS `detalle`,
 1 AS `fecha_inicio`,
 1 AS `fecha_fin`,
 1 AS `name_emprendimiento`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `consultaanunindex`
--

DROP TABLE IF EXISTS `consultaanunindex`;
/*!50001 DROP VIEW IF EXISTS `consultaanunindex`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consultaanunindex` AS SELECT 
 1 AS `path_img`,
 1 AS `id_anuncios`,
 1 AS `id_emprendimiento`,
 1 AS `id_emprendedor`,
 1 AS `Nombre_Anuncio`,
 1 AS `detalle`,
 1 AS `fecha_inicio`,
 1 AS `fecha_fin`,
 1 AS `name_emprendimiento`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `estadistica`
--

DROP TABLE IF EXISTS `estadistica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadistica` (
  `id_estadistica_ip` varchar(50) NOT NULL,
  `visitas` int NOT NULL,
  PRIMARY KEY (`id_estadistica_ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadistica`
--

LOCK TABLES `estadistica` WRITE;
/*!40000 ALTER TABLE `estadistica` DISABLE KEYS */;
INSERT INTO `estadistica` VALUES ('::1',122);
/*!40000 ALTER TABLE `estadistica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `img_emprendimiento`
--

DROP TABLE IF EXISTS `img_emprendimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `img_emprendimiento` (
  `id_img` int NOT NULL AUTO_INCREMENT,
  `path_img` varchar(200) NOT NULL,
  `registro_emprendimiento_Lturistico_id_emprendimiento1` double NOT NULL,
  `id_imgCloud` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_img`),
  KEY `fk_img_emprendimiento_registro_emprendimiento_Lturistico1_idx` (`registro_emprendimiento_Lturistico_id_emprendimiento1`)
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `img_emprendimiento`
--

LOCK TABLES `img_emprendimiento` WRITE;
/*!40000 ALTER TABLE `img_emprendimiento` DISABLE KEYS */;
INSERT INTO `img_emprendimiento` VALUES (327,'https://res.cloudinary.com/cototurist/image/upload/v1621959696/cototurist/kufhizzagvlba6ka9cu5.jpg',130,'cototurist/kufhizzagvlba6ka9cu5'),(328,'https://res.cloudinary.com/cototurist/image/upload/v1621959852/cototurist/n7ulme31evo3gaen4dnc.jpg',131,'cototurist/n7ulme31evo3gaen4dnc');
/*!40000 ALTER TABLE `img_emprendimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id_Notificaciones` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `Notificaciones` varchar(200) DEFAULT NULL,
  `registro_emprendimiento_Lturistico_id_emprendimiento` int NOT NULL,
  `id_emprendedor` int DEFAULT NULL,
  PRIMARY KEY (`id_Notificaciones`),
  KEY `fk_Notificaciones_registro_emprendimiento_Lturistico1_idx` (`registro_emprendimiento_Lturistico_id_emprendimiento`),
  CONSTRAINT `fk_Notificaciones_registro_emprendimiento_Lturistico1` FOREIGN KEY (`registro_emprendimiento_Lturistico_id_emprendimiento`) REFERENCES `registro_emprendimiento_lturistico` (`id_emprendimiento`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
INSERT INTO `notificaciones` VALUES (17,'25 de mayo del 2021','dbermeo1995@gmail.com','Observatorio Daniel',130,2),(18,'25 de mayo del 2021','dbermeo1995@gmail.com','Observatorio Daniel',130,2),(19,'28 de mayo del 2021','dbermeo1995@gmail.com','Observatorio Daniel',130,2);
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parroquia_emprendimiento`
--

DROP TABLE IF EXISTS `parroquia_emprendimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parroquia_emprendimiento` (
  `id_parroquia` int NOT NULL AUTO_INCREMENT,
  `name_parroquia` varchar(45) NOT NULL,
  `canton_emprendimiento_id_canton` int NOT NULL,
  `provincia_emprendimiento_id_provincia` int NOT NULL,
  PRIMARY KEY (`id_parroquia`),
  KEY `fk_parroquia_emprendimiento_canton_emprendimiento1_idx` (`canton_emprendimiento_id_canton`),
  KEY `fk_parroquia_emprendimiento_provincia_emprendimiento1_idx` (`provincia_emprendimiento_id_provincia`),
  CONSTRAINT `fk_parroquia_emprendimiento_canton_emprendimiento1` FOREIGN KEY (`canton_emprendimiento_id_canton`) REFERENCES `canton_emprendimiento` (`id_canton`),
  CONSTRAINT `fk_parroquia_emprendimiento_provincia_emprendimiento1` FOREIGN KEY (`provincia_emprendimiento_id_provincia`) REFERENCES `provincia_emprendimiento` (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parroquia_emprendimiento`
--

LOCK TABLES `parroquia_emprendimiento` WRITE;
/*!40000 ALTER TABLE `parroquia_emprendimiento` DISABLE KEYS */;
INSERT INTO `parroquia_emprendimiento` VALUES (1,'ELOY ALFARO (SAN FELIPE)',1,1),(2,'IGNACIO FLORES (PARQUE FLORES)',1,1),(3,'JUAN MONTALVO (SAN SEBASTIÁN)',1,1),(4,'LA MATRIZ',1,1),(5,'SAN BUENAVENTURA',1,1),(6,'LATACUNGA',1,1),(7,'ALAQUES (ALÁQUEZ)',1,1),(8,'BELISARIO QUEVEDO (GUANAILÍN)',1,1),(9,'GUAITACAMA (GUAYTACAMA)',1,1),(10,'JOSEGUANGO BAJO',1,1),(11,'LAS PAMPAS',1,1),(12,'MULALÓ',1,1),(13,'11 DE NOVIEMBRE (ILINCHISI)',1,1),(14,'POALÓ',1,1),(15,'SAN JUAN DE PASTOCALLE',1,1),(16,'SIGCHOS',1,1),(17,'TANICUCHÍ',1,1),(18,'TOACASO',1,1),(19,'PALO QUEMADO',1,1),(20,'EL CARMEN',2,1),(21,'EL TRIUNFO',2,1),(22,'GUASAGANDA (CAB.EN GUASAGANDA',2,1),(23,'PUCAYACU',2,1),(24,'EL CORAZÓN',3,1),(25,'MORASPUNGO',3,1),(26,'PINLLOPATA',3,1),(27,'RAMÓN CAMPAÑA',3,1),(28,'PUJILÍ',4,1),(29,'ANGAMARCA',4,1),(30,'CHUCCHILÁN (CHUGCHILÁN)',4,1),(31,'GUANGAJE',4,1),(32,'ISINLIBÍ (ISINLIVÍ)',4,1),(33,'LA VICTORIA',4,1),(34,'PILALÓ',4,1),(35,'TINGO',4,1),(36,'ZUMBAHUA',4,1),(37,'SAN MIGUEL',5,1),(38,'ANTONIO JOSÉ HOLGUÍN (SANTA LUCÍA)',5,1),(39,'CUSUBAMBA',5,1),(40,'MULALILLO',5,1),(41,'MULLIQUINDIL (SANTA ANA)',5,1),(42,'PANSALEO',5,1),(43,'SAQUISILÍ',6,1),(44,'CANCHAGUA',6,1),(45,'CHANTILÍN',6,1),(46,'COCHAPAMBA',6,1),(47,'SIGCHOS',7,1),(48,'CHUGCHILLÁN',7,1),(49,'ISINLIVÍ',7,1),(50,'LAS PAMPAS',7,1),(51,'PALO QUEMADO',7,1),(52,'La Mana',2,1),(53,'chimbacalle',8,2);
/*!40000 ALTER TABLE `parroquia_emprendimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia_emprendimiento`
--

DROP TABLE IF EXISTS `provincia_emprendimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia_emprendimiento` (
  `id_provincia` int NOT NULL AUTO_INCREMENT,
  `name_provincia` varchar(45) NOT NULL,
  PRIMARY KEY (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia_emprendimiento`
--

LOCK TABLES `provincia_emprendimiento` WRITE;
/*!40000 ALTER TABLE `provincia_emprendimiento` DISABLE KEYS */;
INSERT INTO `provincia_emprendimiento` VALUES (1,'Cotopaxi'),(2,'Pichincha.');
/*!40000 ALTER TABLE `provincia_emprendimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_emprendedor`
--

DROP TABLE IF EXISTS `registro_emprendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_emprendedor` (
  `id_emprendedor` int NOT NULL AUTO_INCREMENT,
  `name_emprendedor` varchar(60) NOT NULL,
  `password` varchar(200) NOT NULL,
  `telf_emprendedor` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_emprendedor`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_emprendedor`
--

LOCK TABLES `registro_emprendedor` WRITE;
/*!40000 ALTER TABLE `registro_emprendedor` DISABLE KEYS */;
INSERT INTO `registro_emprendedor` VALUES (1,'Bryan Almachi','$2b$10$fgXNBBqtpUmwM3fZWa3T4eeSA05gPavoVXJG8IqCAMpWUdGC.dVfO','+593994540787','alexander95._db@hotmail.com'),(2,'Daniel Bermeo','$2b$10$YbnSrF3QFdydpTP0T5ckFeezxgS4X7froOPRepFaO503EMwy7kbHi','+593994540787','dbermeo1995@gmail.com');
/*!40000 ALTER TABLE `registro_emprendedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_emprendimiento_lturistico`
--

DROP TABLE IF EXISTS `registro_emprendimiento_lturistico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_emprendimiento_lturistico` (
  `id_emprendimiento` int NOT NULL AUTO_INCREMENT,
  `tipo_registro_id_tipo` int NOT NULL,
  `tipo_servicio_id_tipo_servicio` int NOT NULL,
  `servicio_id_servicio` int NOT NULL,
  `servicio_id_servicio1` int NOT NULL,
  `servicio_id_servicio2` int NOT NULL,
  `name_emprendimiento` varchar(100) NOT NULL,
  `registro_emprendedor_id_emprendedor` int NOT NULL,
  `provincia_id_provincia` int NOT NULL,
  `canton_emprendimiento_id_canton` int NOT NULL,
  `parroquia_emprendimiento_id_parroquia` int NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `latitud` varchar(45) NOT NULL,
  `longitud` varchar(45) NOT NULL,
  `detalles` varchar(500) DEFAULT NULL,
  `Contacto` varchar(45) DEFAULT NULL,
  `estado_solicitud` varchar(45) NOT NULL,
  PRIMARY KEY (`id_emprendimiento`),
  UNIQUE KEY `name_emprendimiento_UNIQUE` (`name_emprendimiento`),
  KEY `fk_registro_emprendimiento_registro_emprendedor_idx` (`registro_emprendedor_id_emprendedor`),
  KEY `fk_registro_emprendimiento_provincia1_idx` (`provincia_id_provincia`),
  KEY `fk_registro_emprendimiento_canton_emprendimiento1_idx` (`canton_emprendimiento_id_canton`),
  KEY `fk_registro_emprendimiento_parroquia_emprendimiento1_idx` (`parroquia_emprendimiento_id_parroquia`),
  KEY `fk_registro_emprendimiento_Lturistico_tipo_registro1_idx` (`tipo_registro_id_tipo`),
  KEY `fk_registro_emprendimiento_Lturistico_tipo_servicio1_idx` (`tipo_servicio_id_tipo_servicio`),
  KEY `fk_registro_emprendimiento_Lturistico_servicio1_idx` (`servicio_id_servicio`),
  KEY `fk_registro_emprendimiento_Lturistico_servicio2_idx` (`servicio_id_servicio1`),
  KEY `fk_registro_emprendimiento_Lturistico_servicio3_idx` (`servicio_id_servicio2`),
  CONSTRAINT `fk_registro_emprendimiento_canton_emprendimiento1` FOREIGN KEY (`canton_emprendimiento_id_canton`) REFERENCES `canton_emprendimiento` (`id_canton`),
  CONSTRAINT `fk_registro_emprendimiento_Lturistico_servicio1` FOREIGN KEY (`servicio_id_servicio`) REFERENCES `servicio` (`id_servicio`),
  CONSTRAINT `fk_registro_emprendimiento_Lturistico_servicio2` FOREIGN KEY (`servicio_id_servicio1`) REFERENCES `servicio` (`id_servicio`),
  CONSTRAINT `fk_registro_emprendimiento_Lturistico_servicio3` FOREIGN KEY (`servicio_id_servicio2`) REFERENCES `servicio` (`id_servicio`),
  CONSTRAINT `fk_registro_emprendimiento_Lturistico_tipo_registro1` FOREIGN KEY (`tipo_registro_id_tipo`) REFERENCES `tipo_registro` (`id_tipo`),
  CONSTRAINT `fk_registro_emprendimiento_Lturistico_tipo_servicio1` FOREIGN KEY (`tipo_servicio_id_tipo_servicio`) REFERENCES `tipo_servicio` (`id_tipo_servicio`),
  CONSTRAINT `fk_registro_emprendimiento_parroquia_emprendimiento1` FOREIGN KEY (`parroquia_emprendimiento_id_parroquia`) REFERENCES `parroquia_emprendimiento` (`id_parroquia`),
  CONSTRAINT `fk_registro_emprendimiento_provincia1` FOREIGN KEY (`provincia_id_provincia`) REFERENCES `provincia_emprendimiento` (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_emprendimiento_lturistico`
--

LOCK TABLES `registro_emprendimiento_lturistico` WRITE;
/*!40000 ALTER TABLE `registro_emprendimiento_lturistico` DISABLE KEYS */;
INSERT INTO `registro_emprendimiento_lturistico` VALUES (130,1,1,1,2,4,'Observatorio Daniel',2,1,1,6,'Latacunga','-0.934005733362174','-78.61327171325684','Uno de los mejores lugares turísticos de la provincia','+593994540787','25 de mayo del 2021'),(131,2,4,15,17,16,'Hotel Daniel',2,1,1,1,'Latacunga','-0.9254284877209553','-78.61919403076172','Uno de los mejores Hoteles 5 estrellas','+593994540787','25 de mayo del 2021');
/*!40000 ALTER TABLE `registro_emprendimiento_lturistico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre_servicio` varchar(45) NOT NULL,
  `tipo_servicio_id_tipo_servicio` int NOT NULL,
  `desc_servicio_serv` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`id_servicio`),
  KEY `fk_servicio_tipo_servicio1_idx` (`tipo_servicio_id_tipo_servicio`),
  CONSTRAINT `fk_servicio_tipo_servicio1` FOREIGN KEY (`tipo_servicio_id_tipo_servicio`) REFERENCES `tipo_servicio` (`id_tipo_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (1,'Montañismo',1,'Engloba desde largas expediciones en las que se requieren conocimientos técnicos hasta salidas fáciles de mediodía.'),(2,'Escalar',1,'En montañismo, es una actividad que consiste en realizar ascensos sobre paredes de fuerte pendiente valiéndose de la fuerza física y mental propia.'),(3,'Acampar',1,'En un lugar al aire libre para vivir temporalmente en él, generalmente alojándose en una carpa o tienda de campaña o en una caravana.'),(4,'Caminatas',1,'Implica desplazarse andando sobre los pies, paso tras paso, sin trotar ni correr, sobre una superficie, que puede ser de tierra, de arena, de pasto, de cemento o sobre una cinta de correr que también puede usarse para caminar.'),(5,'Nadar',1,'Avanzar en el agua haciendo los movimientos necesarios con el cuerpo y las extremidades, sin tocar el fondo ni otro apoyo.'),(6,'Flora',2,'Conjunto de plantas de una zona o de un período geológico determinado.'),(7,'Fauna',2,'Conjunto de todas las especies animales, generalmente con referencia a un lugar, clima, tipo, medio o período geológico concretos.'),(8,'Observantorios',2,'conjunto del personal que, en instalaciones adecuadas y con los instrumentos apropiados, se dedica a observaciones, principalmente astronómicas o meteorológicas.'),(9,'Areas Protegidas',2,'Son esenciales para conservar la biodiversidad natural y cultural y los bienes y servicios ambientales que brindan son esenciales para la sociedad.'),(10,'Miradores',2,'Es un lugar o punto elevado desde el cual se puede contemplar bellos lugares y paisajes urbanos o naturales.'),(11,'Iglesias',3,'Refiere tanto a una comunidad local como a una institución religiosa que agrupa a cristianos de una misma confesión.'),(12,'Parques',3,'Terreno acotado en núcleos rurales o urbanos, generalmente con plantas y árboles, destinado a usos diversos, especialmente al recreo público.'),(13,'Cultura',3,'Conjunto de conocimientos e ideas no especializados adquiridos gracias al desarrollo de las facultades intelectuales, mediante la lectura, el estudio y el trabajo.'),(14,'Sitios Emblematicos',3,'Que por sus características singulares tiene carácter de emblema y representa o simboliza algo o alguien.'),(15,'Hoteles',4,'Establecimiento de hostelería que ocupa un edificio total o parcialmente con uso exclusivo de sus servicios (entradas, ascensores, escaleras, etc.) y que ofrece alojamiento y servicio de comedor.'),(16,'Cabañas',4,'Casa pequeña y tosca, generalmente en el campo, hecha de troncos o estacas entretejidas con caña y cubierta de ramas, destinada a albergar o refugiar a alguien. '),(17,'Sitios Comuntarios',4,'Aquel edificio diseñado para la realización de actividades culturales, educativas, sociales y deportivas.'),(18,'Hopedaje/Gastronimia',4,'Establecimiento en el que se preparan, sirven comidas y donde se puede hospedar '),(19,'Restaurantes',5,'Establecimiento en el que se preparan y sirven comidas.'),(20,'Bares',5,'Establecimiento en el que hay un mostrador alargado para servir bebidas y algunas comidas.'),(21,'Alimentos/Bebidas',5,'Sustancia nutritiva que toma un organismo o un ser vivo para mantener sus funciones vitales.'),(22,'Haciendas',4,'Finca que está dedicada a la agricultura, generalmente de gran extensión.'),(24,'Parda de Buses',6,'Es un elemento urbano, perteneciente al mobiliario urbano caracterizado por ser un espacio público, multifuncional de uso social y colectivo, de dimensiones acotadas, destinado a acoger a pasajeros en la espera de un transporte público de parada específica a dicha localización.'),(25,'Parada de Taxis',6,'Lugar de calzada destinado al estacionamiento de taxis de servicio '),(26,'Alquiler ',6,'Al proceso mediante el cual dos partes efectúan la cesión temporal de un bien o servicio a cambio de una contraprestación que generalmente es de tipo económico.'),(27,'Lugares para Cilcismo',1,'Lugar para el  deporte que se desarrolla sobre una bicicleta. De acuerdo a sus características, existen diferentes modalidades o especialidades de ciclismo.'),(28,'Productos elaborados de Ceramica',7,'Arte o técnica de fabricar objetos de barro, loza y porcelana de todas las clases y calidades.'),(29,'Productos elaborados de  de Madera',7,'Materia prima relacionada  con este materias el cual es  sustancia dura y fibrosa que forma el tronco y las ramas de los árboles.'),(30,'Productos elaborados de Fibras',7,'Es un producto de madera reconstituida que se obtiene descomponiendo residuos de madera dura o blanda en fibras de madera'),(31,'Productos elaborados de Metal',7,'Materia prima relacionada con este material el cual es un cuerpo simple, generalmente sólido a temperatura ambiente, que es buen conductor del calor y de la electricidad y que tiene un brillo característico; se emplea, a menudo en aleación con otro metal, en la fabricación de numerosos objetos.'),(32,'Productos elaborados de Piel y Cuero',7,'Materia prima relacionada conla textileria u otros hambitos'),(33,'Textil',7,'Que se emplea en la confección de tejidos.'),(34,'Joyeria',7,'Establecimiento en el que se fabrican, arreglan o venden joyas.'),(36,'Varios',7,'Otros'),(37,'Cultivos',8,'Es la práctica de sembrar semillas en la tierra y realizar las labores necesarias para obtener frutos de las misma'),(38,'Floristeria',8,'Establecimiento o puesto en el que se venden flores y plantas.'),(39,'Bebidas locales',8,'Establecimiento donde se elabore bebidas locales del establecimiento'),(40,'Dulces/Gatronomia',8,'Lugar donde se realizan dulces locales o extranjeros'),(41,'Otros',8,NULL);
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_registro`
--

DROP TABLE IF EXISTS `tipo_registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_registro` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `tipo_registro` varchar(45) NOT NULL,
  `desc_tipo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_registro`
--

LOCK TABLES `tipo_registro` WRITE;
/*!40000 ALTER TABLE `tipo_registro` DISABLE KEYS */;
INSERT INTO `tipo_registro` VALUES (1,'Lugar Turistico','Una atracción turística o atractivo turístico es un lugar de interés que los turistas visitan'),(2,'Servicio ','Los Servicios Turísticos incluyen su producción, distribución, comercialización, venta y prestación y se refieren a los bienes y servicios ofrecidos por las empresas de mercado turístico');
/*!40000 ALTER TABLE `tipo_registro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_servicio`
--

DROP TABLE IF EXISTS `tipo_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_servicio` (
  `id_tipo_servicio` int NOT NULL AUTO_INCREMENT,
  `nom_servicio` varchar(45) NOT NULL,
  `tipo_registro_id_tipo` int NOT NULL,
  `desc_servicio` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_servicio`),
  KEY `fk_tipo_servicio_tipo_registro1_idx` (`tipo_registro_id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_servicio`
--

LOCK TABLES `tipo_servicio` WRITE;
/*!40000 ALTER TABLE `tipo_servicio` DISABLE KEYS */;
INSERT INTO `tipo_servicio` VALUES (1,'Aventura',1,'Es una tipología de viaje que se puede considerar alternativa a las opciones habituales, como son el turismo de sol y playa, el cultural o el de negocios.'),(2,'Ecoturismo',1,'Un viaje responsable a áreas naturales que conservan el ambiente y mejoran el bienestar de la población local.'),(3,'Rural',1,'está relacionado a la vida y actividad que se desarrolla en un campo, el cual es un espacio rico en tradiciones que configuran una forma de ser, y que definen en buena parte la cultura de las naciones, en espacios naturales y en sustento económico para muchos.'),(4,'Hospedaje',2,'se emplea para aludir al alojamiento que se le suministra a una persona. Un hospedaje, por lo tanto, puede ser una hostería, un hotel o un establecimiento similar.'),(5,'Gastronimia',2,'es el estudio del nexo que tienen los seres humanos con su alimentación en relación a su medio ambiente o entorno.'),(6,'Trasporte',2,'terrestre brinda servicio de traslado a los diferentes puntos o lugares dentro de un área geográfica determinada, se lo realiza por medio de vehículos habilitados con las condiciones necesarias que garanticen la seguridad y la comodidad del pasajero.'),(7,'Artesanales',2,'Es un tipo de arte en el que se trabaja fundamentalmente con las manos, moldeando diversos objetos con fines comerciales o meramente artísticos o creativos.'),(8,'Productivos',2,'Se entiende por productivo el que tiene la eficacia, virtud o eficiencia de producir, realizar, rentar o elaborar');
/*!40000 ALTER TABLE `tipo_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `consulta_anuncios`
--

/*!50001 DROP VIEW IF EXISTS `consulta_anuncios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consulta_anuncios` AS select `anuncios`.`id_anuncios` AS `id_anuncios`,`anuncios`.`id_emprendimiento` AS `id_emprendimiento`,`anuncios`.`id_emprendedor` AS `id_emprendedor`,`anuncios`.`Nombre_Anuncio` AS `Nombre_Anuncio`,`anuncios`.`detalle` AS `detalle`,`anuncios`.`fecha_inicio` AS `fecha_inicio`,`anuncios`.`fecha_fin` AS `fecha_fin`,`registro_emprendimiento_lturistico`.`name_emprendimiento` AS `name_emprendimiento` from (`anuncios` join `registro_emprendimiento_lturistico`) where (`anuncios`.`id_emprendimiento` = `registro_emprendimiento_lturistico`.`id_emprendimiento`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `consultaanunindex`
--

/*!50001 DROP VIEW IF EXISTS `consultaanunindex`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consultaanunindex` AS select `img_emprendimiento`.`path_img` AS `path_img`,`anuncios`.`id_anuncios` AS `id_anuncios`,`anuncios`.`id_emprendimiento` AS `id_emprendimiento`,`anuncios`.`id_emprendedor` AS `id_emprendedor`,`anuncios`.`Nombre_Anuncio` AS `Nombre_Anuncio`,`anuncios`.`detalle` AS `detalle`,`anuncios`.`fecha_inicio` AS `fecha_inicio`,`anuncios`.`fecha_fin` AS `fecha_fin`,`registro_emprendimiento_lturistico`.`name_emprendimiento` AS `name_emprendimiento` from ((`img_emprendimiento` join `anuncios`) join `registro_emprendimiento_lturistico`) where ((`anuncios`.`id_emprendimiento` = `registro_emprendimiento_lturistico`.`id_emprendimiento`) and (`img_emprendimiento`.`registro_emprendimiento_Lturistico_id_emprendimiento1` = `anuncios`.`id_emprendimiento`)) group by `img_emprendimiento`.`registro_emprendimiento_Lturistico_id_emprendimiento1` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-24 13:15:39
