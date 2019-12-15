import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { NavBarLink } from './NavBar';

const Logo = styled.img`
  cursor: pointer;
  width: 400px;
  height: 180px;
  vertical-align: middle;
`;

const Title = styled.span``;

const GameButton = ({ link, logo, title, onClick }) => {
  const StyledGameButton = styled(NavBarLink)`
    display: block;
    width: 400px;
    margin: auto;
    margin-bottom: 7px;
    height: auto;
  `;

  return (
    <StyledGameButton onClick={onClick} to={link}>
      <Title>{title}</Title>
      <Logo src={logo} />
    </StyledGameButton>
  );
};

export default inject('rootStore')(observer(GameButton));
