
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary()
    table.string('event_name').notNullable;
    table.string('restaurant_name').notNullable;
    table.string('restaurant_address').notNullable;
    table.string('members')
    table.string('description')
    table.string('event_start').notNullable;
    table.string('event_end').notNullable;
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.integer('users_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
