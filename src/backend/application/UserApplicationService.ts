import { UserId } from 'backend/domain/model/UserId';
import { UserService } from 'backend/domain/service/UserService';
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
    private readonly userFactory: IUserFactory,
    private readonly userService: UserService
  ) {}

  /**
   * getUser
   */
  public async find(userId: UserId): Promise<UserModel> {
    const user = await this.userRepository.find(userId);

    if (!this.userService.exist(user)) {
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
