import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'jjm_bd',
});

export default db;