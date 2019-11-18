const seed = async knex => {
  await knex('game').del();

  const games = [
    'League of Legends',
    'Counter Strike: Global Offensive',
    'DOTA 2'
  ].map(name => {
    return { name };
  });

  return await knex('game').insert(games);
};

module.exports = { seed };
