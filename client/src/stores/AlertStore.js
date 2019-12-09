import { observable, action } from 'mobx';

class AlertStore {
  @observable isOpen = false;
  @observable message = '';
  @observable duration = 5000;
  @observable color = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.color = rootStore.appStore.theme.secondary;
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

  @action initMessage(message) {
    this.color = this.rootStore.appStore.theme.secondary;
    this.message = message;
    this.open();
  }

  @action initError(message) {
    this.color = this.rootStore.appStore.theme.error;
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
