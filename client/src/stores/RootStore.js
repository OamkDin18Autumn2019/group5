import AppStore from './AppStore';
import AuthStore from './AuthStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.authStore = new AuthStore(this);
  }
}

export default RootStore;
