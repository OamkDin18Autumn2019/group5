const authServices = require('../src/auth/authServices');

const seed = async knex => {
  await knex('player').del();

  await authServices.registerUser(knex, {
    username: 'root',
    email: 'root@lmao.lol',
    password: '111111'
  });
};

module.exports = { seed };
