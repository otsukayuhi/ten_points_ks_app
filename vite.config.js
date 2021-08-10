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
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      frontend: path.resolve(__dirname, 'src/frontend'),
      types: path.resolve(__dirname, 'src/backend'),
    },
  },
  build: {
    outDir: 'dist/app',
  },
});
