const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 1234,
  },
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, './src'),
      handlebars: 'handlebars/runtime',
    },
  },
  context: __dirname,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    })
  ],
  module: {
    rules: [
      // typescript
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      // styles
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // handlebars
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
          },
        ],
      },
    ],
  },
};
