-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 29, 2022 at 12:53 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atsiskaitymas`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 3),
(2, 2, 6),
(3, 1, 6),
(4, 4, 7),
(5, 3, 7),
(6, 8, 5),
(7, 8, 3),
(8, 7, 9),
(9, 4, 9),
(10, 5, 10),
(11, 6, 10),
(12, 1, 9),
(13, 2, 9),
(19, 5, 9);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, 1000, 'Flight tickets'),
(2, 1, 2000, 'Hotel'),
(3, 3, 35, 'For dinner'),
(4, 3, 3500, 'For Flight ticket'),
(5, 2, 3500, 'For Flight ticket'),
(6, 3, 50, 'Museum'),
(7, 3, 100, 'Ferry'),
(8, 4, 40, 'River tour'),
(9, 4, 120, 'Hotel'),
(10, 4, 20, 'Taxi'),
(11, 3, 1050, 'For Hotel'),
(12, 4, 30, 'Lunch'),
(13, 4, 100, 'Jeep tour'),
(15, 4, 50, 'Dinner'),
(16, 7, 500, 'Hotel'),
(17, 5, 300, 'Hotel'),
(18, 6, 50, 'Taxi'),
(19, 8, 200, 'Jeep tour'),
(20, 8, 100, 'Fancy dinner'),
(21, 7, 25, 'Lunch'),
(22, 7, 30, 'Taxi'),
(26, 7, 30, 'Pool party');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Trip to Bali'),
(2, 'Trip to Iceland'),
(3, 'Trip to Mexico'),
(4, 'Trip to Tanzania'),
(5, 'Trip to London'),
(6, 'Trip to Vietnam'),
(7, 'Trip to Roma'),
(8, 'Trip to USA'),
(9, 'Trip back home'),
(16, 'testtttttt');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(3, 'Samuel Samson', 'samuel@email.lt', '$2a$10$je4xSHZloGx5ZCbYBSilq.QLZjMnZibHhaTvtjra65SH9kh/bkilO', '2022-05-25 14:56:20'),
(5, 'Ann Annderson', 'ann@email.com', '$2a$10$7b9/iCdWkDH5Oapq6j6XHO/RyLlzladfXkAttXEB2se12q4TSZem2', '2022-05-25 19:59:43'),
(6, 'John Johnson', 'john.john@email.com', '$2a$10$kpXLCiFX67fOgoyaevUF1OYd8Yzq/wtY5O8utpUSkzyUXiQj/q11W', '2022-05-25 20:00:24'),
(7, 'Joan Joanes', 'joan.john@email.com', '$2a$10$XXKjCgheEQWPxeIGX/gMOeUh84z/rlMs0E.Ja/Mv/tvuOYu/542uS', '2022-05-26 10:53:13'),
(9, 'greta jr', 'greta@greta.com', '$2a$10$5eVRbsfmteFn49adb3T9NOYeNZUqLf7cbpMvpI/O87bn4hRyM7rZS', '2022-05-26 17:35:21'),
(10, 'Ted Tedron', 'ted@ted.com', '$2a$10$Bc07l562ZjVRrYzTZ0f5uejXyvgSvD3wVhdKA/L4e5wH2eYd/f39.', '2022-05-26 17:42:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
