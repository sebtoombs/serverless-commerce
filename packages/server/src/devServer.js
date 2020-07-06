const express = require("express");
const path = require("path");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackDevConfig = require("@serverless-commerce/app/webpack.config.dev");

export default function devServer() {
  const app = express();
  const port = process.env.PORT || 8080;

  const config = { mode: "development", ...webpackDevConfig };

  //TODO this path
  config.entry.app.unshift(
    path.resolve(path.join(__dirname, "..", "..", "..", "node_modules")) +
      "/webpack-hot-middleware/client?reload=true&timeout=1000"
  );

  //Add HMR plugin
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  //historyApiFallback
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

  //Actually serve the app
  app.use(express.static(path.join(__dirname, "..", "app", "./public")));

  app.listen(port, () => {
    console.log("Server started on port:" + port);
  });

  return app;
}
