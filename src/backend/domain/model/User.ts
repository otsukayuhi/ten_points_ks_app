import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  private readonly userId: UserId;
  private userName: UserName;

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
