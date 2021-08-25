import { UserId } from 'backend/domain/model/UserId';
import { UserService } from 'backend/domain/service/UserService';
import { CustomError } from 'backend/error/CustomError';
import { IUserFactory } from 'backend/factory/UserFactory';
import { IUserRepository } from 'backend/infrastructure/UserRepository';
import { inject, injectable } from 'tsyringe';
import { UserModel } from 'types/user';

@injectable()
export class UserApplicationService {
  private readonly userRepository: IUserRepository;
  private readonly userFactory: IUserFactory;
  private readonly userService: UserService;

  constructor(
    @inject('IUserRepository')
    userRepository: IUserRepository,
    @inject('IUserFactory')
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

    const user = await this.userRepository.find(userId);

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
