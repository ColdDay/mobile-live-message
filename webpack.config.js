const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
      contentBase: './dist',
      hot: true
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions :{
        mangle: true
      }
    }
    )]
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
              {
                loader: 'file-loader',
                query: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: './',
                  publicPath: 'https://www.mofazhuan.com/mobile-live-message/dist'
                }
              }
            ]
        }
      ]
  }
};