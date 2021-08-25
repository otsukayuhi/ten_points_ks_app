export class UserName {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getUserName(): string {
    return this.name;
  }
}
