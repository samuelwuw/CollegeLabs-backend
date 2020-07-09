
exports.up = function(knex) {
  return knex.schema.createTable('researchers', function(table){
    table.string('name').primary();
    table.string('password').notNullable();
    table.string('id').notNullable();
    table.string('email').notNullable();
    table.string('birthdate').notNullable();
    table.string('workdate').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('institution').notNullable();
    table.string('graduationlvl').notNullable();
    table.string('graduationinstitution').notNullable();
    table.string('latteslink').notNullable();
    table.string('theme1');
    table.string('theme2');
    table.string('theme3');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('researchers');
};
