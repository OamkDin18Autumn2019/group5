import AppStore from './AppStore';
import AuthStore from './AuthStore';
import AlertStore from './AlertStore';
import TeamStore from './TeamStore';
import GamesStore from './GamesStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.authStore = new AuthStore(this);
    this.alertStore = new AlertStore(this);
    this.teamStore = new TeamStore(this);
    this.gamesStore = new GamesStore(this);
  }
}

export default RootStore;
