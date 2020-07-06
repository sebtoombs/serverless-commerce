const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

//Dirname should be within cwd. IF not, we're developing the packages
const isPackageDevelopment = !__dirname.startsWith(process.cwd());

const packageRoot = fs.realpathSync(path.resolve(path.join(__dirname, "..")));

const paths = {
  projectApp: path.join(process.cwd(), "src"),
  //app: isPackageDevelopment
  //  ? path.join(packageRoot, "src")
  //  : path.resolve("@serverless-commerce/app/src"),
  app: path.join(packageRoot, "src"), //Babel-loader cant follow symlinks
  build: path.join(process.cwd(), "build", "app"),
  //public: isPackageDevelopment
  //  ? path.join(packageRoot, "public")
  //  : path.resolve("@serverless-commerce/app/public"),
  public: path.join(packageRoot, "public"),
};

class ModuleShadowingPlugin {
  constructor({ packageRoot, appPath, projectAppPath }) {
    this.packageRoot = packageRoot;
    this.appPath = appPath;
    this.projectAppPath = projectAppPath;
  }
  apply(resolver) {
    resolver.hooks.relative.tapAsync(
      `ModuleShadowingPlugin`,
      (request, stack, callback) => {
        const matchingFile = this.getMatchingFile(request);

        if (!matchingFile) return callback();

        console.log(`Using shadowed file: ${matchingFile}`);

        return resolver.doResolve(
          resolver.hooks.describedRelative,
          { ...request, path: matchingFile },
          null,
          {},
          callback
        );
      }
    );
  }

  getMatchingFile({ path: filepath, relativePath }) {
    if (
      !filepath.includes(this.appPath) ||
      !relativePath ||
      relativePath.charAt(0) === `/`
    )
      return false;

    const projectFilePath = path.join(
      this.projectAppPath.split("/").slice(0, -1).join("/"),
      relativePath
    );

    let exists = false;

    try {
      exists = require.resolve(projectFilePath);
    } catch (e) {}

    return exists;
  }
}

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    //Include app files from core app
    include: [paths.projectApp, paths.app],
    use: {
      //symlinks again
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          //Babel-loader doesn't work while symlinked, so provide absolute paths to presets
          require.resolve("@babel/preset-env"),
          require.resolve("babel-preset-react-app"),
        ],
        plugins: [
          isDevelopment ? require.resolve("react-refresh/babel") : null,
        ].filter(Boolean),
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
    app: [path.join(paths.app, "index.js")],
  },
  output: {
    filename: "bundle.js",
    path: paths.build,
  },
  module: { rules },
  plugins: [
    //Todo allow override maybe?
    new HTMLWebpackPlugin({
      template: path.join(paths.public, "index.html"),
    }),
    isDevelopment ? new ReactRefreshWebpackPlugin() : null,
  ].filter(Boolean),
  devtool: "source-map",
  resolve: {
    plugins: [
      new ModuleShadowingPlugin({
        packageRoot,
        appPath: paths.app,
        projectAppPath: paths.projectApp,
      }),
    ],
    /*modules: [
      path.join(process.cwd(), "node_modules"),
      isPackageDevelopment
        ? path.resolve(path.join(packageRoot, "..", "..", "node_modules"))
        : null,
    ].filter(Boolean),*/
  },
};
