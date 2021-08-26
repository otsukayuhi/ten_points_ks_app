import { db_config } from 'backend/config/db';
import { User } from 'backend/domain/model/User';
import { UserId } from 'backend/domain/model/UserId';
import { UserName } from 'backend/domain/model/UserName';
import mysql from 'mysql';
import { UserDBModel } from 'types/user';

export interface IUserRepository {
  find(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  public async find(userId: UserId): Promise<User | null> {
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

            if (results.length === 0) {
              return resolve(null);
            }

            const { user_id, name } = results[0];
            const user = new User(new UserId(user_id), new UserName(name));

            resolve(user);
            connection.release();
          }
        );
      });
    });
  }

  public async findAll(): Promise<User[]> {
    const pool = mysql.createPool(db_config);
    const sql = 'select * from users';

    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query(sql, (error, results: UserDBModel[]) => {
          if (error) reject(error);

          const userList: User[] = results.map((result) => {
            const { user_id, name } = result;
            return new User(new UserId(user_id), new UserName(name));
          });

          resolve(userList);
          connection.release();
        });
      });
    });
  }
}
