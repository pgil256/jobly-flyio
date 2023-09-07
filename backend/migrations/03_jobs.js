/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jobs", (table) => {
    table.increments("id").primary();
    table.text("title").notNullable();
    table.integer("salary");
    table.decimal("equity");
    table.string("company_handle", 25).notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("jobs");
};
