
exports.up = function(knex) {
  return knex.schema.createTable('publications', function(table){
    table.increments();

    table.string('title').notNullable();
    table.string('local').notNullable();
    table.integer('year').notNullable();
    table.string('abstract').notNullable();
    table.string('tags').notNullable();
    table.string('url');
    table.string('filename');
    table.integer('likes');


    table.string('researcher_id').notNullable();

    table.foreign('researcher_id').references('id').inTable('researchers');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('publications');
};
