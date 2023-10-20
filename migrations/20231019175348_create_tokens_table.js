/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tokens', function (table) {
        table.increments('id').primary();
        table.integer('userId').unsigned().references('users.id');
        table.string('refreshToken',250).notNullable();
        table.string('expiresIn',64).notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tokens');
};
