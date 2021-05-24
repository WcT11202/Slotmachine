-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-04-29 20:24:20
-- 伺服器版本： 10.4.17-MariaDB
-- PHP 版本： 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `casino2`
--

-- --------------------------------------------------------

--
-- 資料表結構 `results`
--
CREATE DATABASE `casino2`;

CREATE TABLE `results` (
  `id` int(10) NOT NULL,
  `betTime` datetime NOT NULL,
  `account` varchar(999) NOT NULL,
  `gameType` varchar(999) NOT NULL,
  `object` varchar(999) NOT NULL,
  `bets` decimal(13,4) NOT NULL,
  `moneyBefore` decimal(13,4) NOT NULL,
  `status` varchar(999) NOT NULL,
  `result` decimal(13,4) NOT NULL,
  `moneyAfter` decimal(13,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `results`
--



-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `UserID` int(10) NOT NULL,
  `UserName` varchar(30) NOT NULL,
  `UserAccount` varchar(30) NOT NULL,
  `UserPassword` varchar(32) NOT NULL,
  `UserWallet` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `UserAccount`, `UserPassword`, `UserWallet`) VALUES
(1, 'Play0001', 'play0001', '943811A65C02A2B0563D2D997B83D016', 10000);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
