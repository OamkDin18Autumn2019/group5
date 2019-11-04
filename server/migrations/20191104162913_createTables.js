const up = knex => {
  return knex.schema.createTable('player', table => {
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
  });
};

const down = knex => {
  return knex.schema.dropTable('player');
};

module.exports = { up, down };
