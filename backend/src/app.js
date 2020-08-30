const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

// Custom middlewares
const { errorHandler, notFound } = require("./middlewares");

// Import api router
const api = require("./api");

// Initialize express app
const app = express();

// Initialize middlewares
app.use(morgan("tiny"));
app.use(helmet());
app.use(compression());
app.use(express.json());

// Base response
app.get("/", (req, res) => {
  res.json({
    message: "🐱‍🏍 Reddit clone api home 🐱‍🏍",
  });
});

// Api routing
app.use("/api/v1", api);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
