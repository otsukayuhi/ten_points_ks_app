import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql';

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const router = express.Router();

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

router.get('/items', (_req, res) => {
  connection.query('select * from items', (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
});

export default router;
