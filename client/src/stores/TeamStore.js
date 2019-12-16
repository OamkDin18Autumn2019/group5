import { decorate, action, observable } from 'mobx';

class TeamStore {
  @observable teamData = [];
  @observable redirect = false;
  @observable reload = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setTeamData(teamData) {
    this.teamData = teamData;
  }

  @action setRedirect(redirect) {
    this.redirect = redirect;
  }

  @action setReload(reload) {
    this.reload = reload;
  }

  async registerTeam(name, gameId) {
    const { appStore } = this.rootStore;
    if ((name, gameId)) {
      try {
        const res = await fetch('http://localhost:8080/api/v1/teams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${appStore.accessToken}`
          },
          body: JSON.stringify({
            name,
            gameId
          })
        });

        if (res) {
          const resolved = await res.json();
          if (resolved.error) {
            console.log(resolved.error);
            throw new Error(resolved.error.message);
          }
          if (res.ok) {
            this.setTeamData(resolved.data.team);
            this.setRedirect(true);
          }
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }

  async getTeamById(id) {
    const { appStore } = this.rootStore;
    if (id) {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/teams/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${appStore.accessToken}`
          }
        });

        if (res) {
          const resolved = await res.json();
          console.log(resolved);

          if (resolved.error) {
            throw new Error(resolved.error.message);
          }
          if (res.ok) {
            this.setTeamData(resolved.data.team);
            this.setReload(true);
          }
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }
}

decorate(TeamStore, {
  registerTeam: action.bound,
  getTeamById: action.bound
});

export default TeamStore;
