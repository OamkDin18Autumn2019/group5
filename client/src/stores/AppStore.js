import { observable, action, computed } from 'mobx';

class AppStore {
  @observable initialized;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.initialized = false;
  }

  @action init() {
    this.initialized = true;
  }

  @action reset() {
    this.initialized = false;
  }
}

export default AppStore;
