
exports.up = function(knex) {
  return knex.schema.createTable('follows', function(table){
    table.string('follows').notNullable();
    table.string('follows_type').notNullable();
    table.string('followed').notNullable();
    table.string('followed_type').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('follows');
};
