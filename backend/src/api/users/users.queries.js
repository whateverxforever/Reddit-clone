const db = require("../../db");
const tableNames = require("../../constants/tableNames");

function find() {
  return db(tableNames.users).select("id", "username", "email", "image_url");
}

/**
 *
 * @param {String} id
 */
function get(id) {
  return db(tableNames.users).where("id", "=", id).first();
}

module.exports = {
  find,
  get,
};
