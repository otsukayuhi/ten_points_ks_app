import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  readonly userId: UserId;
  readonly userName: UserName;

  constructor(userId: UserId, name: UserName) {
    this.userId = userId;
    this.userName = name;
  }

  public getUserId(): string {
    return this.userId.getUserId();
  }

  public getUserName(): string {
    return this.userName.getUserName();
  }
}
