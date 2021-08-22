import { UserId } from 'backend/domain/model/UserId';
import { IUserRepository } from 'backend/infrastructure/UserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserService {
  public userRepository: IUserRepository;

  constructor(
    @inject('IUserRepository')
    userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  /**
   * exist
   */
  public async exist(id: UserId): Promise<boolean> {
    return this.userRepository.exist(id);
  }
}
