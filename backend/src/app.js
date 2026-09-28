const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const env = require("./config/env");

const app = express();

// Auth uses stateless Bearer JWTs (not cookies), so credentialed CORS is not
// required. We therefore do not reflect arbitrary origins WITH credentials.
const allowAllOrigins = env.corsOrigins === "*";
app.use(
  cors({
    origin: allowAllOrigins ? true : env.corsOrigins.split(","),
    credentials: !allowAllOrigins,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// All application routes are namespaced under /api (platform ingress rule).
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
