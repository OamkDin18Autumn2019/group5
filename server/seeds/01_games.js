const seed = async knex => {
  const games = [
    {
      id: 1,
      name: 'Counter Strike: Global Offensive',
      slug: 'counter-strike-global-offensive'
    },
    { id: 2, name: 'DOTA 2', slug: 'dota-2' },
    { id: 3, name: 'League of Legends', slug: 'league-of-legends' }
  ];

  return await knex('game').insert(games);
};

module.exports = { seed };
