const app = require("./app");
const connectDB = require("./config/db");
const { seedAdmin } = require("./services/authService");
const env = require("./config/env");

async function start() {
  try {
    await connectDB();
    await seedAdmin();
    app.listen(env.nodePort, "127.0.0.1", () => {
      console.log(`[server] CET Node backend listening on 127.0.0.1:${env.nodePort}`);
    });
  } catch (err) {
    console.error("[server] failed to start:", err);
    process.exit(1);
  }
}

start();
