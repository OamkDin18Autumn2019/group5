import { action, observable, computed } from 'mobx';

class ProfileStore {
  @observable profile;
  @observable invitations = [];
  @observable teams = [];
  @observable initialized = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action reset() {
    this.profile = null;
    this.invitations = [];
    this.teams = [];
    this.initialized = false;
  }

  @action async GetProfileData() {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.rootStore.appStore.accessToken}`
        }
      });

      if (res) {
        const resolved = await res.json();
        if (resolved.data) {
          this.profile = resolved.data.user;
          this.invitations = resolved.data.invitations;
          this.teams = resolved.data.teams;
          this.initialized = true;
        } else if (resolved.error.message) {
          throw new Error('Something went wrong!');
        }
      }
    } catch (e) {
      console.error(e);
      this.rootStore.alertStore.initError(e.message);
    }
  }

  @action async acceptInvite(id, state) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/invitations/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.rootStore.appStore.accessToken}`
          },
          body: JSON.stringify({ state })
        }
      );

      if (res) {
        const resolved = await res.json();
        if (resolved.data) {
          this.reset();
          if (state === 'accepted') {
            this.rootStore.alertStore.initMessage(
              'You have been added to the team!'
            );
          }
        } else if (resolved.error.message) {
          throw new Error('Something went wrong!');
        }
      }
    } catch (e) {
      console.error(e);
      this.rootStore.alertStore.initError(e.message);
    }
  }

  @computed get pendingInvitations() {
    return this.invitations.filter(
      invitation => invitation.state === 'pending'
    );
  }
}

export default ProfileStore;
