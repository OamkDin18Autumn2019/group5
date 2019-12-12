const seed = async knex => {
  await knex('game').del();

  const games = [
    'Counter Strike: Global Offensive',
    'DOTA 2',
    'League of Legends'
  ].map(name => {
    return { name };
  });

  return await knex('game').insert(games);
};

module.exports = { seed };
