// node.js server used to serve assets bundled by Webpack
// use `npm start` command to launch the server.
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");
console.log("Starting the dev web server...");
const port = 8080;
const path = require("path");

module.exports = () => {
  process.env.NODE_ENV = "development";

  const options = {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    contentBase: "www",
    stats: { colors: true },
  };

  const server = new WebpackDevServer(
    webpack({ mode: "development", ...config }),
    options
  );

  server.listen(port, "localhost", function (err) {
    if (err) {
      console.log(err);
    }
    console.log("WebpackDevServer listening at localhost:", port);
  });
};
