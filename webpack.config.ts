import {Configuration} from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import * as path from 'path';

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
    minimize: true,
    minimizer: [new TerserPlugin({extractComments: false})],
  },
  module: {
    rules: [
      {
        test: /\.([mjt])s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};

export default config;
