import { decorate, action } from 'mobx';

class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async fetchToken(username, password) {
    if (username && password) {
      const res = await fetch('http://localhost:8080/api/v1/auth/token', {
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

  async register(username, email, password, passwordConfirmation) {
    if (username && email && password && passwordConfirmation) {
      try {
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

        if (res) {
          const resolved = await res.json();
          if (resolved.error.errors) {
            throw new Error(Object.values(resolved.error.errors)[0]);
          }
          if (resolved.error.message) {
            throw new Error(resolved.error.message);
          }
        }
        if (res.ok) {
          await this.fetchToken(username, password);
        }
      } catch (e) {
        console.error(e);

        if (e && e.errors) {
          this.rootStore.alertStore.initError(e.errors);
        }
        if (e.message) {
          this.rootStore.alertStore.initError(e.message);
        }
      }
    }
  }
}

decorate(AuthStore, {
  fetchToken: action.bound,
  register: action.bound
});

export default AuthStore;
