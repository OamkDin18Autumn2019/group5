import React from 'react';
import { inject, observer } from 'mobx-react';
import NavBar from './NavBar';
import GameList from './GameList';
import styled from 'styled-components';

const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;
  color: #fff;
  font-family: Arial;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(https://iem.imgix.net/season-13/katowice/wp-content/uploads/2018/07/20180303_helena-kristiansson_iem-katowice_04924-1.jpg?auto=format%2Ccompress&w=6720);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const Home = props => {
  const { appStore } = props.rootStore;

  return (
    <StyledHome>
      <Section>
        <NavBar />
        <GameList />
      </Section>
    </StyledHome>
  );
};

export default inject('rootStore')(observer(Home));
