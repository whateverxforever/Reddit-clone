const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");
const orderedTableNames = require("../../src/constants/orderedTableNames");

/**
 *
 * @param {Knex.CreateTableBuilder} table
 */
function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}

/**
 *
 * @param {Knex.CreateTableBuilder} table
 * @param {String} columnName
 * @param {String} referenceTableName
 * @param {String} referenceColumnName
 */
function addForeignKey(
  table,
  columnName,
  referenceTableName,
  referenceColumnName
) {
  table
    .integer(columnName)
    .notNullable()
    .references(referenceColumnName)
    .inTable(referenceTableName)
    .onDelete("cascade");
}

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  //    users table
  await knex.schema.createTable(tableNames.users, (table) => {
    table.increments().notNullable();
    table.string("email", 254).notNullable().unique();
    table.string("username").notNullable();
    table.string("password", 127).notNullable();
    table.string("image_url", 20000);
    table.datetime("last_login");
    addDefaultColumns(table);
  });

  //   subreddits table
  await knex.schema.createTable(tableNames.subreddits, (table) => {
    table.increments().notNullable();
    table.string("name", 25).notNullable().unique();
    table.string("image_url", 2000);
    table.string("description", 250).notNullable();
    addForeignKey(table, "creator", "users", "id");
    addDefaultColumns(table);
  });

  //   posts table
  await knex.schema.createTable(tableNames.posts, (table) => {
    table.increments().notNullable();
    table.string("title", 50).notNullable();
    table.string("content", 2500);
    table.integer("upvotes").defaultTo(0);
    table.integer("downvotes").defaultTo(0);
    addForeignKey(table, "author", tableNames.users, "id");
    addForeignKey(table, "subreddit", tableNames.subreddits, "id");
    addDefaultColumns(table);
  });

  //   comments table
  await knex.schema.createTable(tableNames.comments, (table) => {
    table.increments().notNullable();
    table.string("content", 1000).notNullable();
    table.integer("likes").notNullable().defaultTo(0);
    addForeignKey(table, "post_id", tableNames.posts, "id");
    addForeignKey(table, "author", tableNames.users, "id");
    addDefaultColumns(table);
  });
};

/**
 *
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  await orderedTableNames.reduce(async (promise, table) => {
    await promise;
    console.log(`Dropping table: ${table}`);
    await knex.schema.dropTable(table);
  }, Promise.resolve());
};
