require = require("esm")(module /*, options*/);
const server = require("./src/server");
module.exports = server;

if (process.argv && process.argv.length >= 3) {
  const command = process.argv[2];
  if (command === `start`) {
    server.default();
  }
}
