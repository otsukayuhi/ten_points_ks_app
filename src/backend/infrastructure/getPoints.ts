import { db_config } from 'backend/config/db';
import mysql from 'mysql';
import { Point } from 'types/points';

const pool = mysql.createPool(db_config);
const sql = 'select * from points where user_id=?';

export const getPoints = async (userId: number): Promise<Point[]> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);

      connection.query(sql, [userId], (error, results: Point[]) => {
        if (error) reject(error);
        resolve(results);
        connection.release();
      });
    });
  });
};
