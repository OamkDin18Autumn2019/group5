const up = knex => {
  return knex.schema
    .createTable('player', table => {
      table.increments('id').primary();
      table
        .string('username', 50)
        .notNullable()
        .unique();
      table
        .string('email', 50)
        .notNullable()
        .unique();
      table.string('password', 255).notNullable();
      table.string('fullname', 50);
    })
    .createTable('game', table => {
      table.increments('id').primary();
      table
        .string('slug', 50)
        .notNullable()
        .unique();
      table
        .string('name', 50)
        .notNullable()
        .unique();
    })
    .createTable('team', table => {
      table.increments('id').primary();
      table
        .string('name', 50)
        .notNullable()
        .unique();
      table
        .integer('captainId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('player');
      table
        .integer('gameId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('game');
      table
        .boolean('recruiting')
        .notNullable()
        .defaultTo(false);
    })
    .createTable('team_roster', table => {
      table.increments('id').primary();
      table
        .integer('playerId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('player');
      table
        .integer('teamId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('team');
    })
    .createTable('request', table => {
      table.increments('id').primary();
      table
        .integer('playerId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('player');
      table
        .integer('teamId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('team');
      table
        .enu('state', ['pending', 'accepted', 'refused'])
        .notNullable()
        .defaultTo('pending');
      table.enu('origin', ['player', 'team']).notNullable();
    });
};

const down = knex => {
  return knex.schema
    .dropTableIfExists('request')
    .dropTableIfExists('team_roster')
    .dropTableIfExists('team')
    .dropTableIfExists('game')
    .dropTableIfExists('player');
};

module.exports = { up, down };
