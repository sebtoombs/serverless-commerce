const webpack = require("webpack");
const webpackConfig = require("@serverless-commerce/app/config/webpack.config");

module.exports = () => {
  const config = { mode: "production", ...webpackConfig };

  webpack(config, (err, stats) => {
    // Stats Object
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.error(err || stats.compilation.errors);
      process.exit;
    }
    // Done processing
    console.log("Build complete");
  });
};
