import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  constructor(private readonly userId: UserId, private userName: UserName) {}

  public getUserId(): string {
    return this.userId.getUserId();
  }

  public getUserName(): string {
    return this.userName.getUserName();
  }
}
