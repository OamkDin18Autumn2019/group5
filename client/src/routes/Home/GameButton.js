import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { NavBarLink } from './NavBar';

const Logo = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  vertical-align: middle;
`;

const Title = styled.span``;

const GameButton = ({ link, logo, title }) => {
  const StyledGameButton = styled(NavBarLink)`
    display: block;
    width: 100%;
    height: 50px;
  `;

  return (
    <StyledGameButton to={link}>
      <Logo src={logo} />
      <Title>{title}</Title>
    </StyledGameButton>
  );
};

export default inject('rootStore')(observer(GameButton));
