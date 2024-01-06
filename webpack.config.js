const path = require("path");

// const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: {
    "js/bundle": "./app/main.js",
  },
  target: "web",
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
          test:  /\.(js|jsx)$/,
          exclude:  /node_modules/,
          use: {
              loader: 'babel-loader',
              options:{
                presets: ["@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]],
              }
          },
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3040,
    hot: false,
    liveReload: true,
    static: {
      directory: "./assets",
      watch: true,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from:  "public/img", to: "img" },
    //   ],
    // }),
  ],
}
