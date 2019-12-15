import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavBar = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: #fff;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 70px;
  height: 70px;
  vertical-align: middle;
  margin-right: 2%;
`;

const Profile = styled.div`
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: #fff;
  margin-left: 1%;
`;

const ProfileLogo = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-left: 100px;
`;

const NavBar = props => {
  const { appStore, gamesStore } = props.rootStore;

  return (
    <StyledNavBar>
      <Link to="/counter-strike-global-offensive">
        <Logo src={gamesStore.selectedGame.logo} />
      </Link>
      <Link to="/profile-page">
        <ProfileLogo
          src={
            'https://icon-library.net/images/profile-icon-white/profile-icon-white-3.jpg'
          }
        />
      </Link>
      <Profile>JyrGi</Profile>
    </StyledNavBar>
  );
};

export default inject('rootStore')(observer(NavBar));
