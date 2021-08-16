import { db_config } from 'backend/config/db';
import mysql from 'mysql';
import { User } from 'types/user';

const pool = mysql.createPool(db_config);
const sql = 'select * from users';

export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);

      connection.query(sql, (error, results: User[]) => {
        if (error) reject(error);
        resolve(results);
        connection.release();
      });
    });
  });
};
