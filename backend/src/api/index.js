const express = require("express");

const userRouter = require("./users/users.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "🐱‍👤 Reddit clone v1 api home 🐱‍👤",
  });
});

router.use("/users", userRouter);

module.exports = router;
