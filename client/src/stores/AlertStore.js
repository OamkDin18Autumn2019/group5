import { observable, action } from 'mobx';

class AlertStore {
  @observable alertOpen = true;
  @observable message = 'Test Alert!';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setMessage(message) {
    this.message = message;
  }
}

export default AlertStore;
