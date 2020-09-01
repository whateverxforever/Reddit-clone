const express = require("express");

const queries = require("./users.queries");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await queries.find();
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const user = await queries.get(id);
      if (user) {
        return res.json(user);
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
