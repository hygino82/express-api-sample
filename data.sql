CREATE TABLE IF NOT EXISTS tb_actor (
    first_name VARCHAR(100) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tb_actor (first_name, last_name) VALUES
('John', 'Smith'),
('Mary', 'Johnson'),
('Michael', 'Brown'),
('Patricia', 'Davis'),
('Robert', 'Wilson'),
('Jennifer', 'Miller'),
('William', 'Moore'),
('Linda', 'Taylor'),
('James', 'Anderson'),
('Elizabeth', 'Thomas'),
('David', 'Jackson'),
('Barbara', 'White'),
('Richard', 'Harris'),
('Susan', 'Martin'),
('Joseph', 'Thompson'),
('Jessica', 'Garcia'),
('Thomas', 'Martinez'),
('Sarah', 'Robinson'),
('Charles', 'Clark'),
('Karen', 'Rodriguez');


USE dbtest;

-- Criação da tabela (Perfeita, sem erros)
CREATE TABLE IF NOT EXISTS tb_user(
    email VARCHAR(150) NOT NULL UNIQUE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(15) NOT NULL,
    password VARCHAR(60) NOT NULL,
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Alterando o delimitador para $$ para o MySQL não travar no primeiro ";"
DELIMITER $$

CREATE DEFINER = `root`@`localhost` PROCEDURE `register_user`(
    p_email VARCHAR(150),
    p_phone_number VARCHAR(15),
    p_password VARCHAR(60)
)
BEGIN
    INSERT INTO tb_user (email, phone_number, password, last_update)
    VALUES (p_email, p_phone_number, p_password, CURRENT_TIMESTAMP);
END$$

-- Voltando o delimitador para o padrão do MySQL
DELIMITER ;