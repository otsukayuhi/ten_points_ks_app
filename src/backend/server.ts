import 'reflect-metadata';

import path from 'path';

import { UserFactory } from 'backend/factory/UserFactory';
import { UserRepository } from 'backend/infrastructure/UserRepository';
import dotenv from 'dotenv';
import express from 'express';
import { container } from 'tsyringe';

import { errorHandler } from './error/errorHandler';
import apiRouter from './router/api';

dotenv.config();

const { PORT = 3001 } = process.env;

container.register('IUserRepository', {
  useClass: UserRepository,
});
container.register('IUserFactory', {
  useClass: UserFactory,
});
container.resolve(UserRepository);
container.resolve(UserFactory);

const app = express();

app.use(express.json());

// Serve API requests from the router
app.use('/api', apiRouter);

// api/ Error handler
app.use(errorHandler);

// Serve app production bundle
app.use(express.static('dist/app'));

// Handle client routing, return all requests to the app
app.get('*', (_req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
