import AppStore from './AppStore';
import AuthStore from './AuthStore';
import AlertStore from './AlertStore';
import TeamStore from './TeamStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.authStore = new AuthStore(this);
    this.alertStore = new AlertStore(this);
    this.teamStore = new TeamStore(this);
  }
}

export default RootStore;
