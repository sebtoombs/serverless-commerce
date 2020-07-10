//require("dotenv").config();
const path = require("path");
const debug = require("debug")("server");
const chokidar = require("chokidar");

//const boot = require("./boot");
//const boot = () => Promise.resolve();

const state = {
  server: null,
  sockets: [],
};

const port = process.env.PORT || 8080;

function start() {
  state.server = require("./server")().listen(port, () => {
    debug("Started on " + port);
  });
  state.server.on("connection", (socket) => {
    debug("Add socket", state.sockets.length + 1);
    state.sockets.push(socket);
  });
}

function pathCheck(id) {
  let shouldReload = true;
  if (id.startsWith(path.join(process.cwd(), "node_modules")))
    shouldReload = false;
  return shouldReload;
  //return (
  //id.startsWith(path.join(__dirname, "routes")) ||
  //   id.startsWith(path.join(__dirname, "server.js"))
  // );
}

function restart() {
  // clean the cache
  Object.keys(require.cache).forEach((id) => {
    if (pathCheck(id)) {
      debug("Reloading", id);
      delete require.cache[id];
    }
  });

  state.sockets.forEach((socket, index) => {
    debug("Destroying socket", index + 1);
    if (socket.destroyed === false) {
      socket.destroy();
    }
  });

  state.sockets = [];

  state.server.close(() => {
    debug("Server is closed");
    debug("\n----------------- restarting -------------");
    start(config);
  });
}

export default function run() {
  return Promise.resolve()
    .then(() => {
      start();
      chokidar
        .watch(".", {
          ignored: ["node_modules", ".git"],
        })
        .on("all", (event, at) => {
          if (event === "add") {
            debug("Watching for", at);
          }

          if (event === "change") {
            debug("Changes at", at);
            restart();
          }
        });
    })
    .catch((err) => {
      console.log(err);
      debug(err);
    });
}
