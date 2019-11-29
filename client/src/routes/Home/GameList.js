import React from 'react';
import { inject, observer } from 'mobx-react';
import GameButton from './GameButton';
import styled from 'styled-components';

const StyledGameList = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  margin: 0;
  outline: black 1px;
`;

const GameList = props => {
  const { appStore } = props.rootStore;

  return (
    <StyledGameList>
      <GameButton
        link={'/counter-strike-global-offensive'}
        logo={
          'https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg'
        }
        title={'CS: GO'}
      />
      <GameButton
        link={'/dota2'}
        logo={'https://huntpng.com/images250/dota-2-logo-png-13.png'}
        title={'DOTA 2'}
      />
      <GameButton
        link={'/league-of-legends'}
        logo={
          'https://lolstatic-a.akamaihd.net/riotbar/prod/1.6.706/images/navigation/icon-game-lol.png'
        }
        title={'League of Legends'}
      />
    </StyledGameList>
  );
};

export default inject('rootStore')(observer(GameList));
