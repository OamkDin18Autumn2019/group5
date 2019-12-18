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

  return (
    <Section>
      <YourTeams />
      <PendingInvitations />
    </Section>
  );
};

export default inject('rootStore')(observer(Profile));
