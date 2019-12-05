import { observable, action } from 'mobx';

class AlertStore {
  @observable open = true;
  @observable message = 'Test Alert!';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action toggleOpen() {
    this.open = !this.open;
  }

  @action setMessage(message) {
    this.message = message;
  }

  @action initError(message) {
    this.open = true;
    this.message = message;
  }

  @action timedClose() {
    this.open = false;
  }
}

export default AlertStore;
