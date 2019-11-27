import { observable, action } from 'mobx';

class AlertStore {
  @observable open = false;
  @observable message = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setMessage(message) {
    this.message = message;
  }
}

export default AlertStore;
