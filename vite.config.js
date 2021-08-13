import path from 'path';

import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': `http://localhost:${PORT}`,
    },
    host: true,
  },
  resolve: {
    alias: {
      frontend: path.resolve(__dirname, 'src/frontend'),
      types: path.resolve(__dirname, 'src/types'),
    },
  },
  build: {
    outDir: 'dist/app',
  },
});
