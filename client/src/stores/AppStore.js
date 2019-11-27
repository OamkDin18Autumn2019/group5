import { decorate, observable, action, computed } from 'mobx';

class AppStore {
  @observable initialized;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.accessToken = null;
    this.initialized = false;
  }

  @action init() {
    this.initialized = true;
  }

  @action reset() {
    this.initialized = false;
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  }

  @action setAccessToken(accessToken) {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  }
}

decorate(AppStore, {
  accessToken: observable
});

export default AppStore;
