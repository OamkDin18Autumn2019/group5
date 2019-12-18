const seed = async knex => {
  await knex('team_roster').del();
  await knex('team').del();
  await knex('player').del();
  await knex('game').del();
};

module.exports = { seed };
