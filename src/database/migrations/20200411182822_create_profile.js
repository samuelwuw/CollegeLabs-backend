
exports.up = function(knex) {
  return knex.schema.createTable('citizens', function(table){
    table.string('name').primary();
    table.string('identity').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('birthdate').notNullable();
    table.string('graduation').notNullable();
    table.string('id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('citizens');
};
