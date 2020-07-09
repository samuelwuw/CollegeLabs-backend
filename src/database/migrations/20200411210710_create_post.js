exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table){
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();

    table.string('researcher_id').notNullable();

    table.foreign('researcher_id').references('id').inTable('researcher');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
