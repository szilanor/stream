import {Configuration, ProgressPlugin} from 'webpack';
import * as path from 'path';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {EsbuildPlugin} from 'esbuild-loader';

const config: Configuration = {
  mode: 'production',
  devtool: 'source-map',
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
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
      }),
    ],
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
  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};

export default config;
