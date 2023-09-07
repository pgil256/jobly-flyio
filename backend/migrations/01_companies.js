/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("companies", (table) => {
    table.string("handle", 25).primary();
    table.text("name").notNullable().unique();
    table.integer("num_employees");
    table.text("description").notNullable();
    table.text("logo_url");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("companies");
};
