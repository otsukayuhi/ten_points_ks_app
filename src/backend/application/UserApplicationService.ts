import { User } from 'backend/domain/model/User';
import { UserId } from 'backend/domain/model/UserId';
import { UserName } from 'backend/domain/model/UserName';
import { UserService } from 'backend/domain/service/UserService';
import { CustomError } from 'backend/error/CustomError';
import { IUserFactory } from 'backend/factory/UserFactory';
import { IUserRepository } from 'backend/infrastructure/UserRepository';
import { UserModel } from 'types/user';

export class UserApplicationService {
  readonly userRepository: IUserRepository;
  readonly userFactory: IUserFactory;
  readonly userService: UserService;

  constructor(
    userRepository: IUserRepository,
    userFactory: IUserFactory,
    userService: UserService
  ) {
    this.userRepository = userRepository;
    this.userFactory = userFactory;
    this.userService = userService;
  }

  /**
   * getUser
   */
  public async find(userId: UserId): Promise<UserModel> {
    if (!(await this.userService.exist(userId))) {
      throw new CustomError('ユーザーが存在しません。', 404);
    }

    const result = await this.userRepository.find(userId);

    return this.userFactory.makeUserModel(result);
  }

  /**
   * getUsers
   */
  public async findAll(): Promise<UserModel[]> {
    const results = await this.userRepository.findAll();

    return this.userFactory.makeUsersModel(results);
  }
}
