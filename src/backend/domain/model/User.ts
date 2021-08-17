import { UserType } from 'types/user';

import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  readonly userId: UserId;
  readonly userName: UserName;

  constructor(data: UserType | undefined) {
    this.userId = new UserId(data?.id);
    this.userName = new UserName(data?.name);
  }

  public getUserId(): number {
    return this.userId.getUserId();
  }

  public getUserName(): string | null {
    return this.userName.getUserName();
  }

  public isExistUser(): boolean {
    return this.getUserId() !== 0;
  }

  static transformQueryStringToUserId(id: string): number {
    return Number(id) || 0;
  }

  static isValidUserId(user_id: number): boolean {
    return user_id === 0;
  }
}
