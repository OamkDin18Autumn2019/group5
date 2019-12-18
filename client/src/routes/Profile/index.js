import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import YourTeams from './YourTeams';
import PendingInvitations from './PendingInvitations';

const Profile = props => {
  const { appStore, profileStore } = props.rootStore;

  const Section = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #20242e;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    overflow: hidden;
    font-family: Robot, Sans-serif;
    align-items: baseline;
  `;

  const MainTitle = styled.h1`
    height: 5%;
    cursor: pointer;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
      2px 2px 0 #000;
    text-align: center;
    color: #fff;
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

  const Profile = styled.div`
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    color: #fff;
  `;

  const ProfileLogo = styled.img`
    cursor: pointer;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    align-content: center;
    &:hover {
      opacity: 0.8;
      transition: 0.1s ease;
    }
    text-align: center;
    align-items: center;
    height: 5%;
  `;

  return (
    <Section>
      <MainTitle
        onClick={() => {
          props.history.push('/');
        }}
      >
        Global E-sports
      </MainTitle>
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
      <YourTeams />
      <PendingInvitations />
    </Section>
  );
};

export default inject('rootStore')(observer(Profile));
