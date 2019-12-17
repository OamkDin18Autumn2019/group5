const seed = async knex => {
  await knex('game').del();

  const games = [
    {
      name: 'Counter Strike: Global Offensive',
      slug: 'counter-strike-global-offensive'
    },
    { name: 'DOTA 2', slug: 'dota-2' },
    { name: 'League of Legends', slug: 'league-of-legends' }
  ];

  return await knex('game').insert(games);
};

module.exports = { seed };
