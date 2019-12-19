import { decorate, action } from 'mobx';

class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async fetchToken(username, password) {
    if (username && password) {
      try {
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
          } else if (resolved.error.message) {
            throw new Error(resolved.error.message);
          }
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
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
          if (res.ok) {
            await this.fetchToken(username, password);
          } else if (resolved.error.errors) {
            throw new Error(Object.values(resolved.error.errors)[0]);
          } else if (resolved.error.message) {
            throw new Error(resolved.error.message);
          }
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }

  logout() {
    this.rootStore.appStore.reset();
    this.rootStore.profileStore.reset();
  }
}

decorate(AuthStore, {
  fetchToken: action.bound,
  register: action.bound,
  reset: action.bound
});

export default AuthStore;
