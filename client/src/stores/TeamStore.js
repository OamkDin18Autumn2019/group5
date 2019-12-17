import { decorate, action, observable, computed } from 'mobx';

class TeamStore {
  @observable teams = [];
  @observable selectedTeamId = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action selectTeam(id) {
    this.selectedTeamId = Number(id);
  }

  @action async registerTeam(name, gameId) {
    const { appStore } = this.rootStore;
    if (name && gameId) {
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
            throw new Error(resolved.error.message);
          }
          if (res.ok) {
            this.teams.push(resolved.data.team);
            this.selectTeam(resolved.data.team.id);
          }
        }
      } catch (e) {
        console.error(e);
        this.rootStore.alertStore.initError(e.message);
      }
    }
  }

  @action async getTeamsDataByGameId() {
    const { appStore } = this.rootStore;
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
        } else if (resolved.error.message) {
          throw new Error('Something went wrong!');
        }
      }
    } catch (e) {
      console.error(e);
      this.rootStore.alertStore.initError(e.message);
    }
  }

  @action async getTeamById(id) {
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

  @action async invitePlayer(username, teamId) {
    if (username && teamId) {
      try {
        const res = await fetch('http://localhost:8080/api/v1/invitations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.rootStore.appStore.accessToken}`
          },
          body: JSON.stringify({
            username,
            teamId
          })
        });
        if (res) {
          const resolved = await res.json();
          console.log(resolved);
          if (res.ok) {
            this.rootStore.alertStore.initMessage(
              'Player has been invited! :)'
            );
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

  @computed get selectedTeam() {
    const team = this.teams.find(team => team.id === this.selectedTeamId);
    return team;
  }
}

export default TeamStore;
