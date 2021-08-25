import { CustomError } from 'backend/error/CustomError';

export class UserId {
  private readonly id: string;

  constructor(id: unknown) {
    if (typeof id !== 'string') {
      throw new CustomError('不正なユーザーIDです。', 404);
    }

    if (id.length <= 4) {
      throw new CustomError('ユーザーIDの文字数が足りません。', 404);
    }

    this.id = id;
  }

  public getUserId(): string {
    return this.id;
  }
}
