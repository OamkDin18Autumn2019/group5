import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  flex-wrap: wrap;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  @media (max-width: 700px) {
    display: block;
    align-items: center;
  }
`;

const Title = styled.h1`
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
    width: 250px;
    align-items: center;
  }
`;

export const NavBarLink = styled(Link)`
  text-decoration: none;
  width: 190px;
  height: auto;
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
  margin-bottom: 0;

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
  @media (max-width: 700px) {
    display: inline-block;
    width: 190px;
    align-items: center;
  }
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
  width: 100%;
  text-decoration: none;
  align-content: center;
  align-items: center;
  align-text: center;
  &:hover {
    opacity: 0.8;
    transition: 0.1s ease;
  }
`;

const NavBar = props => {
  const { appStore, authStore, profileStore } = props.rootStore;

  return (
    <>
      {appStore.accessToken ? (
        <StyledNavBar>
          <Title>Global E-sports</Title>
          <StyledLink
            to="/profile-page"
            onClick={() => profileStore.GetProfileData()}
          >
            <Profile>
              {profileStore.profile && profileStore.profile.username}{' '}
              <ProfileLogo
                src={
                  'https://icon-library.net/images/profile-icon-white/profile-icon-white-3.jpg'
                }
              />{' '}
            </Profile>
          </StyledLink>
          <NavBarLink to="/create-team">Create Team</NavBarLink>
          <NavBarLink onClick={() => authStore.logout()}>Logout</NavBarLink>
        </StyledNavBar>
      ) : (
        <StyledNavBar>
          <Title>Global E-sports</Title>
          <NavBarLink to="/login">Login</NavBarLink>
          <NavBarLink to="/register">Register</NavBarLink>
        </StyledNavBar>
      )}
    </>
  );
};

export default inject('rootStore')(observer(NavBar));
