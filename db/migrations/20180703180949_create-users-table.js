exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', (table) => {
   table.increments('id').primary()
   table.string('name').notNullable;
   table.string('email').unique().notNullable;
   table.string('password')
   table.timestamp('created_at').notNullable().defaultTo(knex.raw(‘now()’));
 })
};

exports.down = function(knex, Promise) {

};