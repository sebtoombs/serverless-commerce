const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader"],
  },
];
module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: { rules },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devtool: "source-map",
  devServer: {
    hot: true,
  },
  /*resolve: {
    alias: {
      react: path.join(__dirname, "..", "..", "node_modules", "react"),
    },
  },*/
};
