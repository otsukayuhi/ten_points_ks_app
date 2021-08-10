const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/backend/server.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.server.json',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      backend: path.resolve(__dirname, 'src/backend'),
      types: path.resolve(__dirname, 'src/types'),
    },
    extensions: ['.ts'],
  },
  externals: [nodeExternals()],
};
