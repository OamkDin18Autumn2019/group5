import { decorate, action } from 'mobx';

class TeamStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async registerTeam(name, gameId) {
    if ((name, gameId)) {
      try {
        const res = await fetch('http://localhost:8080/api/vi/teams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name
          }),
          gameId
        });

        if (res) {
          const resolved = await res.json();
          if (resolved.error) {
            console.log(resolved.error);
            throw new Error(resolved.error.message);
          }
        }
        if (res.ok) {
          //do something if the team regiser works
        }
      } catch (e) {
        console.error(e);
        //this.rootStore.alertStore
      }
    }
  }
}

decorate(TeamStore, {
  registerTeam: action.bound
});

export default TeamStore;
