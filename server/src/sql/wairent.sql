-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 17, 2021 at 11:28 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wairent`
--

-- --------------------------------------------------------

--
-- Table structure for table `date_times`
--

CREATE TABLE `date_times` (
  `date_time_id` int(10) UNSIGNED NOT NULL,
  `time` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `date_times`
--

INSERT INTO `date_times` (`date_time_id`, `time`) VALUES
(2, 'Day'),
(3, 'Night');

-- --------------------------------------------------------

--
-- Table structure for table `hair_types`
--

CREATE TABLE `hair_types` (
  `hair_type_id` int(10) UNSIGNED NOT NULL,
  `name_type` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hair_types`
--

INSERT INTO `hair_types` (`hair_type_id`, `name_type`) VALUES
(1, 'Pigtail'),
(2, 'PonyTail'),
(3, 'TwinTail'),
(4, 'Ahoge'),
(5, 'Ribbon');

-- --------------------------------------------------------

--
-- Table structure for table `hobby`
--

CREATE TABLE `hobby` (
  `hobby_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hobby`
--

INSERT INTO `hobby` (`hobby_id`, `name`) VALUES
(1, 'Gaming'),
(2, 'Watch Anime'),
(3, 'Read Manga'),
(4, 'Swimming'),
(5, 'Dance');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','user') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `role`) VALUES
(2, 'RoxyNgoding', 'Light@gmail.com', 'AKWokadowa', '2021-02-04 14:12:53', NULL),
(23, 'Zuans888', 'zuans999@gmail.com', '$2b$10$hxa1rtZU5nX1oOEUD1ayx.XgfELuvrQQ03a715HTfo3S01wb1V2Ge', '2021-02-07 09:35:04', 'user'),
(26, 'Zuans89', 'zuans@gmail.com', '$2b$10$8kqBAFuV0y9TgiquYzGSUeLgXKV2YibaCzkVg4sQH3u9165pWyiv6', '2021-02-08 12:41:53', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `waifus`
--

CREATE TABLE `waifus` (
  `waifu_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `price` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `hair_type` int(10) UNSIGNED DEFAULT NULL,
  `date_time` int(10) UNSIGNED DEFAULT NULL,
  `total_rating` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `count_rating` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `hobby` int(10) UNSIGNED DEFAULT NULL,
  `hobby_2` int(10) UNSIGNED DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `waifus`
--

INSERT INTO `waifus` (`waifu_id`, `name`, `price`, `age`, `hair_type`, `date_time`, `total_rating`, `count_rating`, `hobby`, `hobby_2`, `description`) VALUES
(2, 'Zero Two', 180000, 24, 1, 2, 19, 4, 3, 4, 'Heloo Im Zero Two'),
(3, 'Emilia', 230000, 105, 2, 2, 0, 0, 3, 1, 'Im Emilia,i am a half efl'),
(4, 'Asuna Yuuki', 10000, 18, 1, 2, 0, 0, 1, 2, 'My Waifu all time'),
(5, 'Zero Two', 80000, 28, 2, 2, 0, 0, 1, 2, 'My Waifu all time'),
(6, 'Kaori', 120000, 16, 4, 3, 0, 0, 2, 3, 'Hello im kaori'),
(8, 'Hori', 120000, 16, 3, 2, 0, 0, 1, 2, 'Hello im kaori'),
(9, 'Chizuru ', 240000, 18, 2, 3, 0, 0, 4, 2, 'Hello im kaori');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `date_times`
--
ALTER TABLE `date_times`
  ADD PRIMARY KEY (`date_time_id`);

--
-- Indexes for table `hair_types`
--
ALTER TABLE `hair_types`
  ADD PRIMARY KEY (`hair_type_id`);

--
-- Indexes for table `hobby`
--
ALTER TABLE `hobby`
  ADD PRIMARY KEY (`hobby_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `waifus`
--
ALTER TABLE `waifus`
  ADD PRIMARY KEY (`waifu_id`),
  ADD KEY `fk_hobby_1` (`hobby`),
  ADD KEY `fk_hobby_2` (`hobby_2`),
  ADD KEY `hair_type` (`hair_type`),
  ADD KEY `fk_date_time` (`date_time`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `date_times`
--
ALTER TABLE `date_times`
  MODIFY `date_time_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hair_types`
--
ALTER TABLE `hair_types`
  MODIFY `hair_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hobby`
--
ALTER TABLE `hobby`
  MODIFY `hobby_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `waifus`
--
ALTER TABLE `waifus`
  MODIFY `waifu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `waifus`
--
ALTER TABLE `waifus`
  ADD CONSTRAINT `fk_date_time` FOREIGN KEY (`date_time`) REFERENCES `date_times` (`date_time_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_hobby_1` FOREIGN KEY (`hobby`) REFERENCES `hobby` (`hobby_id`),
  ADD CONSTRAINT `fk_hobby_2` FOREIGN KEY (`hobby_2`) REFERENCES `hobby` (`hobby_id`),
  ADD CONSTRAINT `waifus_ibfk_1` FOREIGN KEY (`hair_type`) REFERENCES `hair_types` (`hair_type_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
