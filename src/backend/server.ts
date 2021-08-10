import path from 'path';

import dotenv from 'dotenv';
import express from 'express';

import apiRouter from './router/api';

dotenv.config();

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

// Serve API requests from the router
app.use('/api', apiRouter);

// Serve app production bundle
app.use(express.static('dist/app'));

// Handle client routing, return all requests to the app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
