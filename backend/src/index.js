const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⭕ Reddit-clone has started listening on port: ${PORT} ⭕`);
});
