import AppStore from './AppStore';
import TeamStore from './TeamStore';
import AuthStore from './AuthStore';
import AlertStore from './AlertStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.teamStore = new TeamStore(this);
    this.authStore = new AuthStore(this);
    this.alertStore = new AlertStore(this);
  }
}

export default RootStore;
