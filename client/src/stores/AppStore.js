import { decorate, observable, action, computed } from 'mobx';

class AppStore {
  @observable initialized;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.accessToken = null;
    this.initialized = false;
    this.displayAlert = false;
    this.errorMessage = '';
  }

  @action.bound init() {
    this.initialized = true;
  }

  @action.bound reset() {
    this.initialized = false;
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  }

  @action.bound setAccessToken(accessToken) {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  }

  @action.bound setDisplayAlert(displayAlert) {
    this.displayAlert = displayAlert;
    this.errorMessage = errorMessage;
  }
}

decorate(AppStore, {
  accessToken: observable
});

export default AppStore;
