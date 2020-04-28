const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: 'https://www.mofazhuan.com/mobile-live-message/',
    path: path.resolve(__dirname, 'dist')
  },
    devServer: {
        contentBase: './dist',
        hot: true
    },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
    
  ],
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }
      ]
  }
};