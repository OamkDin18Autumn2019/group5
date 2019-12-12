class Team {
  constructor({ id, name, gameId, captainId, recruiting, players }) {
    this.id = id;
    this.name = name;
    this.gameId = gameId;
    this.captainId = captainId;
    this.recruiting = !!recruiting;
    this.players = players;
  }
}

module.exports = Team;
