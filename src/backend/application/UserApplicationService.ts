import { User } from 'backend/domain/model/User';
import { UserId } from 'backend/domain/model/UserId';
import { CustomError } from 'backend/error/CustomError';
import { IUserFactory } from 'backend/factory/UserFactory';
import { IUserRepository } from 'backend/infrastructure/UserRepository';
import { inject, injectable } from 'tsyringe';
import { UserModel } from 'types/user';

@injectable()
export class UserApplicationService {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('IUserFactory')
    private readonly userFactory: IUserFactory
  ) {}

  /**
   * getUser
   */
  public async find(userId: UserId): Promise<UserModel> {
    const user = await this.userRepository.find(userId);

    if (!User.exist(user)) {
      throw new CustomError('ユーザーが存在しません。', 404);
    }

    return this.userFactory.makeUserModel(user);
  }

  /**
   * getUsers
   */
  public async findAll(): Promise<UserModel[]> {
    const userList = await this.userRepository.findAll();

    return this.userFactory.makeUserListModel(userList);
  }
}
