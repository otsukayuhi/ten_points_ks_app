import { UserId } from 'backend/domain/model/UserId';
import { IUserRepository } from 'backend/infrastructure/UserRepository';

export class UserService {
  public userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * exist
   */
  public async exist(id: UserId): Promise<boolean> {
    return this.userRepository.exist(id);
  }
}
