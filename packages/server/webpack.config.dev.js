const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const resolveDependency = (name) => {
  return fs.realpathSync(
    path.resolve(path.join(__dirname, "..", "..", "node_modules", name))
  );
};

//Babel needs something to be set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    //Include app files from core app
    include: [
      fs.realpathSync(path.resolve(path.join(__dirname, "..", "app", "src"))),
    ],
    //loader: require.resolve("babel-loader"),
    use: {
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          //Babel-loader doesn't work while symlinked, so provide absolute paths to presets
          resolveDependency("@babel/preset-env"),
          resolveDependency("babel-preset-react-app"),
        ],
        babelrc: false,
      },
    },
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader"],
  },
];

module.exports = {
  entry: {
    app: [path.join(__dirname, "..", "app", "src", "index.js")],
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "build"),
  },
  module: { rules },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "..", "app", "public", "index.html"),
    }),
  ],
  devtool: "source-map",
  /*resolve: {
    modules: [
      fs.realpathSync(
        path.resolve(path.join(__dirname, "..", "..", "node_modules"))
      ),
    ],
  },*/
};
