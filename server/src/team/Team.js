class Team {
  constructor({
    id,
    name,
    gameId,
    captainId,
    recruiting,
    canInvitePlayers,
    players
  }) {
    this.id = id;
    this.name = name;
    this.gameId = gameId;
    this.captainId = captainId;
    this.recruiting = !!recruiting;
    this.canInvitePlayers = !!canInvitePlayers;
    this.players = players;
  }
}

module.exports = Team;
