//require("dotenv").config();

const debug = require("debug")("server");

const port = process.env.PORT || 8080;

function start() {
  const server = require("./server")().listen(port, () => {
    debug("Started on " + port);
  });
}
export default function run() {
  return Promise.resolve()
    .then(() => {
      start();
    })
    .catch((err) => {
      console.log(err);
      debug(err);
    });
}
