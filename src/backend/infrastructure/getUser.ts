import { db_config } from 'backend/config/db';
import mysql from 'mysql';
import { UserType } from 'types/user';

const pool = mysql.createPool(db_config);
const sql = 'select * from users where id=?';

export const getUser = async (id: number): Promise<UserType | undefined> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);

      connection.query(sql, [id], (error, results: UserType[]) => {
        if (error) reject(error);
        resolve(results[0]);
        connection.release();
      });
    });
  });
};
