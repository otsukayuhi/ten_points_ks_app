export class UserName {
  readonly name: string | null;

  constructor(name: string | undefined) {
    this.name = name || null;
  }

  public getUserName(): string | null {
    return this.name;
  }
}
