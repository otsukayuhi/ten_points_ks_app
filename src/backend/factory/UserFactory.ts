import { User } from 'backend/domain/model/User';
import { UserId } from 'backend/domain/model/UserId';
import { UserName } from 'backend/domain/model/UserName';
import { UserDBModel, UserModel } from 'types/user';

export interface IUserFactory {
  makeUserModel(user: UserDBModel): UserModel;
  makeUsersModel(results: UserDBModel[]): UserModel[];
}

export class UserFactory implements IUserFactory {
  public makeUserModel(result: UserDBModel): UserModel {
    const { user_id, name } = result;
    const user = new User(new UserId(user_id), new UserName(name));

    return {
      user_id: user.getUserId(),
      name: user.getUserName(),
    };
  }

  public makeUsersModel(results: UserDBModel[]): UserModel[] {
    return results.map((result) => {
      const { user_id, name } = result;
      const user = new User(new UserId(user_id), new UserName(name));

      return {
        user_id: user.getUserId(),
        name: user.getUserName(),
      };
    });
  }
}
