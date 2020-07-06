const express = require("express");
const path = require("path");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("@serverless-commerce/app/config/webpack.config");

const emulator = require("./emulator");

const serverConfig = require("../config");

export default function server() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(emulator(serverConfig));

  //historyApiFallback
  app.use((req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
      req.url = "/"; // this would make express-js serve index.html
    }
    next();
  });

  if (isDevelopment) {
    const config = {
      mode: "development",
      ...webpackConfig,
    };

    //TODO this path
    config.entry.app.unshift(
      path.resolve(path.join(__dirname, "..", "..", "..")) +
        "/webpack-hot-middleware/client?reload=true&timeout=1000"
    );

    //Add HMR plugin
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
      })
    );

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
  }

  //Actually serve the app
  app.use(
    express.static(
      path.resolve(path.join(__dirname, "..", "..", "app", "public"))
    )
  );

  app.listen(port, () => {
    console.log(
      (isDevelopment ? "Dev" : "") + "Server started on port:" + port
    );
  });

  return app;
}
