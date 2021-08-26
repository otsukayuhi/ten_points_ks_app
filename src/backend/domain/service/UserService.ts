import { User } from 'backend/domain/model/User';

export class UserService {
  /**
   * ユーザーが存在するか
   */
  public exist(user: User | null): user is User {
    return user instanceof User;
  }
}
