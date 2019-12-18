import React, { useEffect } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import GameNavBar from './GameNavBar';
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
  font-family: Robot, Sans-serif;
`;

const MainTitle = styled.h1`
  width: 100%;
  heigth: 37px;
  cursor: pointer;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  text-align: center;
  color: #fff;
  display: inline-block !important;
  align-items: center;
  &:hover {
    opacity: 0.8;
    transition: 0.1s ease;
  }
  @media (max-width: 700px) {
    display: block;
    width: 100%;
    align-items: center;
  }
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
          <Buttons />
          <FeaturedTournaments />
        </Section>
      ) : (
        <Section>
          <FeaturedTournaments />
        </Section>
      )}
    </>
  );
};

export default inject('rootStore')(observer(Games));
