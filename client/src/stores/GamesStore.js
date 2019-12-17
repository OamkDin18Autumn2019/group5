import { observable, action, computed } from 'mobx';

class GamesStore {
  @observable selectedGameId = null;
  @observable games = [
    {
      name: 'counter-strike-global-offensive',
      logo:
        'https://esportbetweb.com/wp-content/uploads/2019/07/csgo-moreorange2.png',
      id: 1
    },
    {
      name: 'dota-2',
      logo:
        'https://upload.wikimedia.org/wikipedia/commons/f/fe/DOTA-logo-wis.png',
      id: 2
    },
    {
      name: 'league-of-legends',
      logo:
        'https://cdn.leagueoflegends.com/riotbar/prod/1.6.718/images/navigation/icon-game-lol.png',
      id: 3
    }
  ];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get selectedGame() {
    return this.games.find(game => game.id === this.selectedGameId);
  }

  @action selectGame(gameId) {
    this.selectedGameId = gameId;
  }
}

export default GamesStore;
