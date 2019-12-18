import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import YourTeams from './YourTeams';
import PendingInvitations from './PendingInvitations';

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

  const Section = styled.div`
    width: 100%;
    height: 100%;
    // position: absolute;
    background: #20242e;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    overflow: auto;
    font-family: Robot, Sans-serif;
    align-items: baseline;
  `;

  return (
    <Section>
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
