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
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  // watch: true,
  devtool: 'source-map'
};

const serverConfig = {
  entry: {
    app: './src/app.js',
    // babelPolyfill: 'babel-polyfill'
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
