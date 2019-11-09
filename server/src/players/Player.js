const Player = require('./Player');

class Captain extends Player {
  constructor({ id, username, email, fullname }) {
    super({ id, username, email, fullname });
  }
}

module.exports = Captain;
