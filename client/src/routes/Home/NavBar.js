import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: inline-block;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const Title = styled.h1`
  width: 100%;
  margin-left: 15px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  text-align: center;
  display: inline-block !important;
  align-items: center;
`;

export const NavBarLink = styled(Link)`
  text-decoration: none;
  width: 400px;
  height: 32px;
  background: #7de88c;
  border: none;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-weight: 650;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  padding: 0;
  margin: 10px;

  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
  }

  &:active {
    opacity: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
  }
`;

const NavBar = props => {
  const { appStore } = props.rootStore;

  return (
    <StyledNavBar>
      <Title>Global e-Sports</Title>
      <NavBarLink to="/login">Login</NavBarLink>
      <NavBarLink to="/register">Register</NavBarLink>
    </StyledNavBar>
  );
};

export default inject('rootStore')(observer(NavBar));
