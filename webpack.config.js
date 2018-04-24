const path = require('path');
const webpack = require('webpack');

const sharedConfig = {
  watch: true
};

const serverConfig = {
  mode: 'development',
  target: 'node',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      $dirname: JSON.stringify(__dirname)
    })
  ]
};
Object.assign(serverConfig, sharedConfig);

const clientConfig = {
  mode: 'development',
  entry: './index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['react', 'env'] }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
Object.assign(clientConfig, sharedConfig);

module.exports = [serverConfig, clientConfig];
