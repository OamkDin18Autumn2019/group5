import { decorate, action } from 'mobx';

class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async fetchToken(usernameOrEmail, password) {
    if (usernameOrEmail && password) {
      const res = await fetch('http://localhost:8080/api/v1/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernameOrEmail,
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

  async register(username, email, password, passwordConfirmation) {
    if (username && email && password && passwordConfirmation) {
      const res = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirmation
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
