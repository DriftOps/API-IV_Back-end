import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin', // Insira a sua senha do banco de dados
  database: 'jjm_bd', // Insira o nome do seu banco de dados
});

export default db;