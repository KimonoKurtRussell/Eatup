exports.up = function(knex, Promise) {
 return knex.schema.createTable('attendees', (table) => {
   table.increments('id').primary()
   table.integer('users_id').references('id').inTable('users')
   table.integer('events_id').references('id').inTable('events')
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('attendees');
};