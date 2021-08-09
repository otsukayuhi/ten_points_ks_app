import mysql from 'mysql';
import { User } from 'types/user';

import { db_config } from '../config/db';

const pool = mysql.createPool(db_config);

export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);

      connection.query('select * from users', (error, results: User[]) => {
        if (error) reject(error);
        resolve(results);
        connection.release();
      });
    });
  });
};
