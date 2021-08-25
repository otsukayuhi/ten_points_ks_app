import { User } from 'backend/domain/model/User';
import { UserModel } from 'types/user';

export interface IUserFactory {
  makeUserModel(user: User): UserModel;
  makeUserListModel(usrList: User[]): UserModel[];
}

export class UserFactory implements IUserFactory {
  public makeUserModel(user: User): UserModel {
    return {
      user_id: user.getUserId(),
      name: user.getUserName(),
    };
  }

  public makeUserListModel(usrList: User[]): UserModel[] {
    return usrList.map((user) => ({
      user_id: user.getUserId(),
      name: user.getUserName(),
    }));
  }
}
