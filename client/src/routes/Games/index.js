import React, { useEffect } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import NavBar from './NavBar';
import Buttons from './Buttons';
import FeaturedTournaments from './FeaturedTournaments';

const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #20242e;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const Games = props => {
  const { gamesStore, appStore } = props.rootStore;

  useEffect(() => {
    if (!gamesStore.selectedGame) {
      const game = gamesStore.games.find(
        game => game.name === props.location.pathname.substr(1)
      );
      gamesStore.selectGame(game.id);
    }
  }, []);

  return (
    <>
      {gamesStore.selectedGame && appStore.authenticated ? (
        <Section>
          <NavBar />
          <Buttons />
          <FeaturedTournaments />
        </Section>
      ) : (
        <Section>
          <NavBar />
          <FeaturedTournaments />
        </Section>
      )}
    </>
  );
};

export default inject('rootStore')(observer(Games));
