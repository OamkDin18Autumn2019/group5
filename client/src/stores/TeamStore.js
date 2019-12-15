import { decorate, action, observable } from 'mobx';

class TeamStore {
  @observable teams = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async registerTeam(name, gameId) {
    if ((name, gameId)) {
      try {
        const res = await fetch('http://localhost:8080/api/v1/teams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          console.log(resolved.data.team); // log data from response
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }

  async getTeamDataById() {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/teams?gameId=${this.rootStore.gamesStore.selectedGameId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (res) {
        const resolved = await res.json();
        console.log(resolved);
        if (resolved.data) {
          this.teams = resolved.data.teams;
        } else if (resolved.error.message) {
          throw new Error('Something went wrong!');
        }
      }
    } catch (e) {
      console.error(e);
      if (e) {
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }
}

decorate(TeamStore, {
  registerTeam: action.bound,
  getTeamDataById: action.bound
});

export default TeamStore;
