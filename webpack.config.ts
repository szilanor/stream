import {Configuration} from 'webpack';
import * as path from 'path';
import {EsbuildPlugin} from 'esbuild-loader';

const config: Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    library: 'Stream',
    libraryTarget: 'umd',
    clean: true,
    umdNamedDefine: true,
    globalObject: 'this',
  },
  optimization: {
    minimizer: [new EsbuildPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};

export default config;
