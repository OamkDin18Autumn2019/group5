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
`;

const Profile = styled.div`
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: #fff;
  margin-left: 9px;
`;

const ProfileLogo = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  vertical-align: middle;
`;

const StyledLink = styled(Link)`
  width: 150px;
  text-decoration: none;
  align-content: center;
  align-items: center;
  align-text: center;
  &:hover {
    opacity: 0.8;
    transition: 0.1s ease;
  }
`;

const GameNavBar = props => {
  const { appStore, gamesStore, profileStore } = props.rootStore;

  return (
    <>
      {gamesStore.selectedGame && gamesStore.selectedGame.name ? (
        <StyledNavBar>
          <StyledLink to={gamesStore.selectedGame.name}>
            <Logo src={gamesStore.selectedGame.logo} />
          </StyledLink>
          <StyledLink to="/profile-page">
            <Profile>
              {profileStore.profile && profileStore.profile.username}{' '}
              <ProfileLogo
                src={
                  'https://icon-library.net/images/profile-icon-white/profile-icon-white-3.jpg'
                }
              />{' '}
            </Profile>
          </StyledLink>
        </StyledNavBar>
      ) : (
        ''
      )}
    </>
  );
};

export default inject('rootStore')(observer(GameNavBar));
