
exports.up = function(knex) {
  return knex.schema.createTable('citizens', function(table){
    table.string('name').primary();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('citizens');
};
