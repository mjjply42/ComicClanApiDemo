SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

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
    `image_link` varchar(255),
    `date_posted` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `comments` (
    `comment_id` int(255) NOT NULL,
    `post_id` int(255) NOT NULL,
    `user_id` int(255) NOT NULL,
    `comment` varchar(255) NOT NULL,
    `image_link` varchar(255),
    `date_posted` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `users` (`user_id`, `user_name`, `password`, `date_joined`) VALUES
(1, 'm@gmail.com', 'cat123', NOW()),
(2, '233rdasd@gmail.com', 'dog123', NOW()),
(3, '43f@hotmail.com', 'dog', NOW()),
(4, '??>UDHJKwio2d@aol.com', 'cat', NOW());

INSERT INTO `posts` (`post_id`, `user_id`, `content`, `image_link`, `date_posted`) VALUES
(1, 1, 'Tell me about those chickens', 'N/A', NOW()),
(2, 2, 'Something else wrong with the picture here', 'N/A', NOW()),
(3, 1, 'All of the oranges despise me deeply', 'N/A', NOW()),
(4, 2, 'Do you know what day of the racoon it is?', 'N/A', NOW()),
(5, 1, 'An easy way to sheer a sheep is by washing its ears', 'N/A', NOW()),
(6, 3, 'Why yes, I do dabble in mayonaise', 'N/A', NOW()),
(7, 3, 'If having children was funny...', 'N/A', NOW()),
(8, 4, 'The easiest melon is a watermelon', 'N/A', NOW());

INSERT INTO `comments` (`comment_id` ,`post_id`, `user_id`, `comment`, `image_link`, `date_posted`) VALUES
(1, 1, 1, 'user m@gmail comment on post#1', 'N/A', NOW()),
(2, 1, 1, 'user m@gmail comment on post#1', 'N/A', NOW()),
(3, 1, 1, 'user m@gmail comment on post#1', 'N/A', NOW()),
(4, 2, 2, '233rdasd@gmail.com comment on post# 2', 'N/A', NOW()),
(5, 2, 3, '43f@hotmail.com comment on post# 2', 'N/A', NOW()),
(6, 2, 3, '43f@hotmail.com comment on post# 2', 'N/A', NOW()),
(7, 1, 3, '43f@hotmail.com comment on post# 1', 'N/A', NOW()),
(8, 3, 3, '43f@hotmail.com comment on post# 3', 'N/A', NOW()),
(9, 3, 4, '??>UDHJKwio2d@aol.com comment on post# 3', 'N/A', NOW()),
(10, 3, 4, '??>UDHJKwio2d@aol.com comment on post# 3', 'N/A', NOW()),
(11, 3, 1, 'm@gmail.com comment on post# 3', 'N/A', NOW()),
(12, 4, 1, 'm@gmail.com comment on post# 4', 'N/A', NOW()),
(13, 6, 1, 'm@gmail.com comment on post# 6', 'N/A', NOW()),
(14, 6, 2, '233rdasd@gmail.com comment on post# 6', 'N/A', NOW()),
(15, 6, 2, '233rdasd@gmail.com comment on post# 6', 'N/A', NOW()),
(16, 6, 2, '233rdasd@gmail.com comment on post# 6', 'N/A', NOW()),
(17, 5, 1, 'm@gmail.com comment on post# 5', 'N/A', NOW()),
(18, 5, 4, '??>UDHJKwio2d@aol.com comment on post# 5', 'N/A', NOW()),
(19, 5, 4, '??>UDHJKwio2d@aol.com comment on post# 5', 'N/A', NOW()),
(20, 7, 4, '??>UDHJKwio2d@aol.com comment on post# 7', 'N/A', NOW()),
(21, 7, 4, '??>UDHJKwio2d@aol.com comment on post# 7', 'N/A', NOW());

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
