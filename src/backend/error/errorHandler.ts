import express from 'express';

import { CustomError } from './CustomError';

export const errorHandler = (
  err: CustomError,
  _req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: express.NextFunction
): void => {
  console.log(err.stack);

  if (err instanceof CustomError) {
    res.status(err.code).json({ error: { message: err.message } });
    return;
  }
  res.status(500).send('Server Error');
};
