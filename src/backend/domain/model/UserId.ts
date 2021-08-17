export class UserId {
  readonly id: number;

  constructor(id: number | undefined) {
    this.id = id || 0;
  }

  public getUserId(): number {
    return this.id;
  }
}
