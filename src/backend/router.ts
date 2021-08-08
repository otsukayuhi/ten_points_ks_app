import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql';
import { User } from 'types/user';

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const router = express.Router();

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

router.get('/users', (_req: express.Request, res: express.Response) => {
  connection.query('select * from users', (error, results: User[]) => {
    if (error) throw error;
    res.json(results);
  });
});

export default router;
