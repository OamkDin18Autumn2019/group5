import { observable, action } from 'mobx';

class AlertStore {
  @observable isOpen = false;
  @observable message = '';
  @observable duration = 5000;
  @observable color = '#e8807d';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setMessage(message) {
    this.message = message;
  }

  @action setDuration(duration) {
    this.duration = duration;
  }

  @action setColor(color) {
    this.color = color;
  }

  @action initError(message) {
    this.message = message;
    this.open();
  }

  @action open() {
    this.isOpen = true;
  }

  @action close() {
    this.isOpen = false;
  }
}

export default AlertStore;
