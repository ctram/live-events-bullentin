const webpack = require('webpack');
const path = require('path');

const sharedOptions = {
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // need this to use es6 class extends feature
              ['babel-preset-env', { exclude: ['transform-es2015-classes'] }],
              ['babel-preset-react'],
              ['babel-preset-stage-1']
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
      }
    ]
  },
  watch: true,
  devtool: 'source-map'
};

const serverConfig = {
  entry: {
    app: './src/app.js'
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].node.js'
  }
};
Object.assign(serverConfig, sharedOptions);

const clientConfig = {
  entry: {
    index: './src/index.js'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
};
Object.assign(clientConfig, sharedOptions);

module.exports = [serverConfig, clientConfig];
