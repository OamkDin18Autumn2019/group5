import { decorate, action, observable } from 'mobx';

class TeamStore {
  @observable teams = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
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
            this.teams.push(resolved.data.team);
          }
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }

  async getTeamsDataByGameId() {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/teams?gameId=${this.rootStore.gamesStore.selectedGameId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.rootStore.appStore.accessToken}`
          }
        }
      );

      if (res) {
        const resolved = await res.json();
        if (resolved.data) {
          this.teams = resolved.data.teams;
          console.log(this.teams);
        } else if (resolved.error.message) {
          throw new Error('Something went wrong!');
        }
      }
    } catch (e) {
      console.error(e);
      this.rootStore.alertStore.initError(e.message);
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
            const index = this.teams.findIndex(
              team => team.id === resolved.data.team.id
            );

            if (index !== -1) {
              this.teams.splice(index, 1, resolved.data.team);
            } else {
              this.teams.push(resolved.data.team);
            }
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
  getTeamsDataByGameId: action.bound,
  getTeamById: action.bound
});

export default TeamStore;
