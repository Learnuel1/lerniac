const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./logger");
const { CONFIG, CORS_WHITE_LIST } = require("./config");
const { errorHandler } = require("./middlewares/error.middleware");
const expressWinston = require("express-winston");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: function (origin, cb) {
      logger.info({ origin, whitelists: CORS_WHITE_LIST }, "Cors Info");
      logger.info({...CORS_WHITE_LIST }, "Cors Info");
      if (!origin || CORS_WHITE_LIST.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(expressWinston.logger(logger));
// app.disable("etag");
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("/api/v1/status", (_req, res) => {
  res.send({ msg: `Yes!... Welcome to ${CONFIG.APP_NAME} API` });
});
app.use(errorHandler);
module.exports = app;
