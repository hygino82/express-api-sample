CREATE TABLE tb_actor (
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
