import { db_config } from 'backend/config/db';
import { UserId } from 'backend/domain/model/UserId';
import mysql from 'mysql';
import { UserDBModel } from 'types/user';

export interface IUserRepository {
  find(userId: UserId): Promise<UserDBModel>;
  findAll(): Promise<UserDBModel[]>;
  exist(userId: UserId): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  public async find(userId: UserId): Promise<UserDBModel> {
    const pool = mysql.createPool(db_config);
    const sql = 'select * from users where user_id=?';

    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query(
          sql,
          [userId.getUserId()],
          (error, results: UserDBModel[]) => {
            if (error) reject(error);
            resolve(results[0]);
            connection.release();
          }
        );
      });
    });
  }

  public async findAll(): Promise<UserDBModel[]> {
    const pool = mysql.createPool(db_config);
    const sql = 'select * from users';

    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query(sql, (error, results: UserDBModel[]) => {
          if (error) reject(error);

          resolve(results);
          connection.release();
        });
      });
    });
  }

  public async exist(userId: UserId): Promise<boolean> {
    const pool = mysql.createPool(db_config);
    const sql = 'select * from users where user_id = ?';

    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query(
          sql,
          [userId.getUserId()],
          (error, results: UserDBModel[]) => {
            if (error) reject(error);
            resolve(results.length !== 0);
            connection.release();
          }
        );
      });
    });
  }
}
