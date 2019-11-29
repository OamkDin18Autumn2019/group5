import { observable, action, computed } from 'mobx';

class AppStore {
  theme = {
    primary: '#20242E',
    secondary: '#7DE88C',
    detail: '#FFE796',
    error: '#E8807D'
  };

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
