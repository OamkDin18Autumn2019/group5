import AppStore from './AppStore';
import TeamStore from './TeamStore';
import AuthStore from './AuthStore';
import AlertStore from './AlertStore';
import GamesStore from './GamesStore';
import ProfileStore from './ProfileStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.teamStore = new TeamStore(this);
    this.authStore = new AuthStore(this);
    this.alertStore = new AlertStore(this);
    this.gamesStore = new GamesStore(this);
    this.profileStore = new ProfileStore(this);
  }
}

export default RootStore;
