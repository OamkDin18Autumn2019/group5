import AppStore from './AppStore';
import TeamStore from './TeamStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.teamStore = new TeamStore(this);
  }
}

export default RootStore;
