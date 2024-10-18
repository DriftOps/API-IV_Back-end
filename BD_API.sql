-- Criação do banco de dados
CREATE DATABASE jjm_bd;

-- Usando o banco de dados criado
USE jjm_bd;

-- Criação da tabela jjm_users
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
INSERT INTO jjm_users (nome, cpf, tp_user, dt_nascimento, email, senha)
VALUES 
('João Silva', '12345678901', 'admin', '1985-07-15', 'joao.silva@email.com', 'admin'),
('Maria Oliveira', '98765432100', 'user', '1990-11-20', 'maria.oliveira@email.com', 'userMaria');

select * from jjm_users;

-- Criar tabela de processos
CREATE TABLE IF NOT EXISTS processos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_de_processo VARCHAR(50) NOT NULL,        -- Tipo de processo (Operacional, Comercial, Financeiro)
    status VARCHAR(100) NOT NULL,                 -- Status do processo
    localizacao VARCHAR(100) NOT NULL,            -- Localização do processo
    detalhes TEXT NOT NULL,                       -- Detalhes do processo
    responsavel_id INT NOT NULL,                  -- Chave estrangeira para o responsável pelo processo
    outras_informacoes TEXT,                      -- Informações adicionais
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data e hora da criação do processo
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data e hora da última atualização do processo
    FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id) ON DELETE CASCADE
);

-- Criar tabela de responsáveis
CREATE TABLE IF NOT EXISTS responsaveis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,                   -- Nome do responsável
    email VARCHAR(100) NOT NULL UNIQUE,           -- Email do responsável (único)
    telefone VARCHAR(20),                         -- Telefone do responsável
    cargo VARCHAR(50),                            -- Cargo do responsável
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de registro do responsável
);

-- Criar tabela de logs (opcional) para rastrear alterações nos processos
CREATE TABLE IF NOT EXISTS logs_processo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    processo_id INT NOT NULL,                     -- Chave estrangeira do processo
    acao VARCHAR(100) NOT NULL,                   -- Descrição da ação (por exemplo, 'criado', 'atualizado', 'excluído')
    responsavel_id INT NOT NULL,                  -- Quem realizou a ação
    data_acao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da ação
    FOREIGN KEY (processo_id) REFERENCES processos(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id) ON DELETE CASCADE
);

-- Exemplo de inserção de responsáveis para referência inicial
INSERT INTO responsaveis (nome, email, telefone, cargo)
VALUES
    ('João da Silva', 'joao.silva@email.com', '99999-1234', 'Gerente Operacional'),
    ('Maria Oliveira', 'maria.oliveira@email.com', '98888-5678', 'Coordenadora Financeira');
