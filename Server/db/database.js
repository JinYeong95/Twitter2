import mysql from 'mysql2';
import { config } from '../config.js'; 

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password
    // host: '127.0.0.1',
    // user: 'root',
    // database: 'dwitter',
    // password: '1234'
});

export const db = pool.promise(); // 비동기 처리를 위해 promise로 넘겨버림