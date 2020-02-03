SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE mydb;
USE mydb;
CREATE TABLE `users` (
    `user_id` int(255) NOT NULL,
    `user_name` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `date_joined` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `posts` (
    `post_id` int(255) NOT NULL,
    `user_id` int(255) NOT NULL,
    `content` varchar(255) NOT NULL,
    `date_posted` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `comments` (
    `comment_id` int(255) NOT NULL,
    `post_id` int(255) NOT NULL,
    `user_id` int(255) NOT NULL,
    `comment` varchar(255) NOT NULL,
    `date_posted` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- User Password Hashes for DB
-- m@gmail.com : cat123
-- 233rdasd@gmail.com : dog123
-- 43f@hotmail.com : dog
-- ??>UDHJKwio2d@aol.com : cat

INSERT INTO `users` (`user_id`, `user_name`, `password`, `date_joined`) VALUES
(1, 'm@gmail.com', '$2a$10$86hyCSy9Ug45QW5Zcj/e7Od8pTQGS36C1lI9x7tFKi5xz8Wnd9IcG', NOW()),
(2, '233rdasd@gmail.com', '$2a$10$FMZPzZo82EOG0GlpP2n8su.FPmuyXQc2bf7mgRqQvUY26A2UJyQFC', NOW()),
(3, '43f@hotmail.com', '$2a$10$TRKYnd3.aCw636QuN0W01OEbdZ8i7lSNJrKIzXDGsUdAWVNR6juy6', NOW()),
(4, '??>UDHJKwio2d@aol.com', '$2a$10$bcMuDM2hemWL3yGLtePiMeJJHAa3HZgtliHDT/xT3Fgl0gSP8.n7a', NOW());

INSERT INTO `posts` (`post_id`, `user_id`, `content`, `date_posted`) VALUES
(1, 1, 'Tell me about those chickens', NOW()),
(2, 2, 'Something else wrong with the picture here', NOW()),
(3, 1, 'All of the oranges despise me deeply', NOW()),
(4, 2, 'Do you know what day of the racoon it is?', NOW()),
(5, 1, 'An easy way to sheer a sheep is by washing its ears', NOW()),
(6, 3, 'Why yes, I do dabble in mayonaise', NOW()),
(7, 3, 'If having children was funny...', NOW()),
(8, 4, 'The easiest melon is a watermelon', NOW());

INSERT INTO `comments` (`comment_id` ,`post_id`, `user_id`, `comment`, `date_posted`) VALUES
(1, 1, 1, 'user m@gmail comment on post#1', NOW()),
(2, 1, 1, 'user m@gmail comment on post#1', NOW()),
(3, 1, 1, 'user m@gmail comment on post#1', NOW()),
(4, 2, 2, '233rdasd@gmail.com comment on post# 2', NOW()),
(5, 2, 3, '43f@hotmail.com comment on post# 2', NOW()),
(6, 2, 3, '43f@hotmail.com comment on post# 2', NOW()),
(7, 1, 3, '43f@hotmail.com comment on post# 1', NOW()),
(8, 3, 3, '43f@hotmail.com comment on post# 3', NOW()),
(9, 3, 4, '??>UDHJKwio2d@aol.com comment on post# 3', NOW()),
(10, 3, 4, '??>UDHJKwio2d@aol.com comment on post# 3', NOW()),
(11, 3, 1, 'm@gmail.com comment on post# 3', NOW()),
(12, 4, 1, 'm@gmail.com comment on post# 4', NOW()),
(13, 6, 1, 'm@gmail.com comment on post# 6', NOW()),
(14, 6, 2, '233rdasd@gmail.com comment on post# 6', NOW()),
(15, 6, 2, '233rdasd@gmail.com comment on post# 6', NOW()),
(16, 6, 2, '233rdasd@gmail.com comment on post# 6', NOW()),
(17, 5, 1, 'm@gmail.com comment on post# 5', NOW()),
(18, 5, 4, '??>UDHJKwio2d@aol.com comment on post# 5', NOW()),
(19, 5, 4, '??>UDHJKwio2d@aol.com comment on post# 5', NOW()),
(20, 7, 4, '??>UDHJKwio2d@aol.com comment on post# 7', NOW()),
(21, 7, 4, '??>UDHJKwio2d@aol.com comment on post# 7', NOW());

ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`);
ALTER TABLE `users`
    MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;


ALTER TABLE `posts`
    ADD PRIMARY KEY (`post_id`);
ALTER TABLE `posts`
    MODIFY `post_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;


ALTER TABLE `comments`
    ADD PRIMARY KEY (`comment_id`);
ALTER TABLE `comments`
    MODIFY `comment_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;
