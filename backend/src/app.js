const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const env = require("./config/env");

const app = express();

app.use(
  cors({
    origin: env.corsOrigins === "*" ? true : env.corsOrigins.split(","),
    credentials: true,
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
