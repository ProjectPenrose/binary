const dotenv = require("dotenv");

const { NODE_ENV = "development", DEV_HOST = "localhost", PORT = 3000 } = process.env;

const app = require("./app.js");
const server = require("http").createServer(app);

require("./routes/index.js")(app);

const cluster = require("cluster");
const { cpus } = require("os");
const numCPUs = cpus().length;


/**
 * HANDLING UNCAUGHT EXCEPTION ERRORS
 * Process.traceDeprecation = true;
 */
process.on("uncaughtException", (err) => {
  console.log(
    `UNCAUGHT EXCEPTION! Server Shutting down...\n
    ${err.name} \n ${err.message} \n ${err.stack}`
  );
  process.exit(1);
});

server.timeout = 60 * 60 * 1000;
  
if (NODE_ENV === "production") {
  if (cluster.isPrimary) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(
        "worker %d died (%s). restarting...",
        worker.process.pid,
        signal || code
      );
      cluster.fork();
    });
  } else {
  server.listen(PORT, DEV_HOST, () =>
    console.log(
      `Server running on port: ${DEV_HOST}:${PORT}, Process ID: ${process.pid}, DB: connected`
    )
  );
  }
} else {
  server.listen(PORT, DEV_HOST, () =>
    console.log(
      `Server running on port: ${DEV_HOST}:${PORT}, Process ID: ${process.pid}, DB: connected`
    )
  );
}

process.on("SIGINT", () => process.exit(1));