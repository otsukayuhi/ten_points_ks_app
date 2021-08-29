import { CustomError } from 'backend/error/CustomError';

export class UserId {
  private readonly id: string;

  constructor(id: unknown) {
    if (!this.isString(id)) {
      throw new CustomError('不正なユーザーIDです。', 404);
    }

    if (this.checkLength(id)) {
      throw new CustomError('ユーザーIDの文字数が足りません。', 404);
    }

    this.id = id;
  }

  public getUserId(): string {
    return this.id;
  }

  /**
   * 文字列か
   */
  public isString(id: unknown): id is string {
    return typeof id === 'string';
  }

  /**
   * 指定の文字数か
   */
  public checkLength(id: string): boolean {
    return id.length <= 4;
  }
}
