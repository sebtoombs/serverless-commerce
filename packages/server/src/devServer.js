const express = require("express");
const path = require("path");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackDevConfig = require("../webpack.config.dev");

export default function devServer() {
  const app = express();
  const port = 8080;

  const config = { mode: "development", ...webpackDevConfig };

  config.entry.app.unshift(
    "/Users/sebtoombs/Projects/serverless-commerce/node_modules/webpack-hot-middleware/client?reload=true&timeout=1000"
  );

  //Add HMR plugin
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  app.use((req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
      req.url = "/"; // this would make express-js serve index.html
    }
    next();
  });

  //Enable "webpack-dev-middleware"
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );

  //Enable "webpack-hot-middleware"
  app.use(webpackHotMiddleware(compiler));

  app.use(express.static(path.join(__dirname, "..", "app", "./public")));

  app.listen(port, () => {
    console.log("Server started on port:" + port);
  });

  return app;
}
