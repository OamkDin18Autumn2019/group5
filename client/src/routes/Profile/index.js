import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import YourTeams from './YourTeams';
import PendingInvitations from './PendingInvitations';

const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #20242e;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: auto;
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

const StyledProfile = styled.div`
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

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Tbody = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  background: #32353d;
  margin-top: 10px;
  padding: 40px;
  @media (max-width: 700px) {
    display: flex;
    font-size: 14px;
    flex-direction: column;
    align-items: left;
    padding: 15px;
    width: 80%;
  }
`;

const Profile = props => {
  const { appStore, profileStore } = props.rootStore;

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
        <StyledProfile>
          {profileStore.profile && profileStore.profile.username}{' '}
          <ProfileLogo
            src={
              'https://icon-library.net/images/profile-icon-white/profile-icon-white-3.jpg'
            }
          />{' '}
        </StyledProfile>
      </StyledLink>
      <Container>
        <Tbody>
          <YourTeams />
          <div></div>
          <PendingInvitations />
        </Tbody>
      </Container>
    </Section>
  );
};

export default inject('rootStore')(observer(Profile));
