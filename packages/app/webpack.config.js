const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

function CustomDirectoryResolver(source, target) {
  this.source = source || "resolve";
  this.target = target || "resolve";
}

CustomDirectoryResolver.prototype.apply = function (resolver) {
  var target = resolver.ensureHook(this.target);
  resolver
    .getHook(this.source)
    .tapAsync("CustomDirectoryResolver", function (
      request,
      resolveContext,
      callback
    ) {
      if (request.request[0] === "#") {
        var req = request.request.substr(1);
        var obj = Object.assign({}, request, {
          request: req + "/" + path.basename(req) + ".js",
        });
        return resolver.doResolve(target, obj, null, resolveContext, callback);
      }
      callback();
    });
};

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
    path: path.join(__dirname, "build"),
  },
  module: { rules },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devtool: "source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
  },

  /*resolve: {
    plugins: CustomDirectoryResolver,
  },*/
};
