require = require("esm")(module /*, options*/);

//module.exports = server;

if (process.argv && process.argv.length >= 3) {
  const command = process.argv[2];
  if (command === `dev`) {
    const server = require("./src/dev");
    server.default();
  }
  if (command === `start`) {
    const server = require("./src");
    server.default();
  }
}
