import { User } from 'backend/domain/model/User';
import { UserId } from 'backend/domain/model/UserId';
import { UserName } from 'backend/domain/model/UserName';
import { UserService } from 'backend/domain/service/UserService';
import { CustomError } from 'backend/error/CustomError';
import { IUserRepository } from 'backend/infrastructure/UserRepository';
import { UserModel } from 'types/user';

export class UserApplicationService {
  readonly userRepository: IUserRepository;
  readonly userService: UserService;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.userService = new UserService(this.userRepository);
  }

  /**
   * getUser
   */
  public async getUser(userId: UserId): Promise<UserModel> {
    if (!(await this.userService.exist(userId))) {
      throw new CustomError('ユーザーが存在しません。', 404);
    }

    const result = await this.userRepository.find(userId);
    const user = new User(userId, new UserName(result.name));

    return {
      user_id: user.getUserId(),
      name: user.getUserName(),
    };
  }

  /**
   * getUsers
   */
  public async getUsers(): Promise<UserModel[]> {
    const results = await this.userRepository.findAll();

    return results.map((result) => {
      const user = new User(
        new UserId(result.user_id),
        new UserName(result.name)
      );

      return {
        user_id: user.getUserId(),
        name: user.getUserName(),
      };
    });
  }
}
