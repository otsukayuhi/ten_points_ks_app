import 'reflect-metadata';

import { UserFactory } from 'backend/factory/UserFactory';
import { UserRepository } from 'backend/infrastructure/UserRepository';
import { container } from 'tsyringe';

container.register('IUserRepository', {
  useClass: UserRepository,
});

container.register('IUserFactory', {
  useClass: UserFactory,
});

container.resolve(UserRepository);
container.resolve(UserFactory);
