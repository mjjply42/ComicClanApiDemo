SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
    `id` int(255) NOT NULL,
    `user_name` varchar(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `users` (`id`, `user_name`, `password`) VALUES
(1, 'm@gmail.com', "cat123"),
(2, '233rdasd@gmail.com', "dog123"),
(3, '43f@hotmail.com', "dog"),
(4, '??>UDHJKwio2d@aol.com', "cat");

ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
    MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;
