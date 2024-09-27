-- Criação do banco de dados
CREATE DATABASE jjm_bd;

-- Usando o banco de dados criado
USE jjm_bd;

-- Criação da tabela jjm_login
CREATE TABLE jjm_users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para cada registro
    nome VARCHAR(100) NOT NULL, -- Nome do usuário
    cpf CHAR(11) NOT NULL UNIQUE, -- CPF (11 caracteres, formato sem pontos ou traços)
    tp_user ENUM('admin', 'user') NOT NULL, -- Tipo de usuário (pode ser ajustado conforme necessidade)
    dt_nascimento DATE NOT NULL, -- Data de nascimento
    email VARCHAR(100) NOT NULL UNIQUE, -- Email do usuário
    senha VARCHAR(255) NOT NULL -- Senha (normalmente será armazenada com hash)
);
-- Inserção de dois usuários com tipos diferentes (admin e user)
INSERT INTO jjm_login (nome, cpf, tp_user, dt_nascimento, email, senha)
VALUES 
('João Silva', '12345678901', 'admin', '1985-07-15', 'joao.silva@email.com', 'admin'),
('Maria Oliveira', '98765432100', 'user', '1990-11-20', 'maria.oliveira@email.com', 'userMaria');

select * from jjm_users;


