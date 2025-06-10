import mysql from 'mysql2/promise';

const databaseConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'bank'
};

export const pool = mysql.createPool(databaseConfig);