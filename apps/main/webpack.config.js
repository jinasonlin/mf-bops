const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
    ],
  },
  plugins: [
    // new ModuleFederationPlugin({
    //   name: 'main',
    //   remotes: {
    //     'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
    //     'component-app': 'component_app@http://localhost:3001/remoteEntry.js',
    //   },
    // }),
    new HtmlWebpackPlugin({
      template: './src/view/index.html',
    }),
  ],
  devServer: {
    port: 3001,
  },
};
