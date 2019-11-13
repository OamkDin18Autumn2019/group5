import { decorate, action } from 'mobx';

class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async fetchToken(username, password) {
    if (username && password) {
      const res = await fetch('xxx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (res) {
        const resolved = await res.json();

        if (resolved.data && resolved.data.accessToken) {
          this.rootStore.appStore.setAccessToken(resolved.data.accessToken);
        }
      }
    }
  }

  async register(username, password) {
    if (username && password) {
      const res = await fetch('xxx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (res.ok) {
        await this.fetchToken(username, password);
      }
    }
  }
}

decorate(AuthStore, {
  fetchToken: action.bound,
  register: action.bound
});

export default AuthStore;
