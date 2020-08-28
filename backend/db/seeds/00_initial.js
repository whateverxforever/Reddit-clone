const Knex = require("knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const tableNames = require("../../src/constants/tableNames");
const orderedTables = require("../../src/constants/orderedTableNames");

/**
 *
 * @param {Knex} knex
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await orderedTables.reduce(async (promise, table) => {
    await promise;
    console.log(`Clearing table: ${table}`);
    return knex(table).del();
  }, Promise.resolve());

  // Seed for user table
  const password = crypto.randomBytes(15).toString("hex");
  const user = {
    email: "lucifer@reddit.co",
    username: "lucifer_morningstar",
    password: await bcrypt.hash(password, 12),
  };

  // Inserts seed entry in tablr
  const [createdUser] = await knex(tableNames.users)
    .insert(user)
    .returning("*");

  console.log("User created: ", { createdUser, password });
};
