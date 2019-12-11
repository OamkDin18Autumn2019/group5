import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Team = props => {
  const { appStore, teamStore } = props.rootStore;

  const Section = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: #20242e;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    overflow: hidden;
  `;

  const getTeam = async () => {
    await teamStore.getTeamDataById();
  };

  return (
    <Section>
      <button onClick={getTeam}>lol</button>
    </Section>
  );
};

export default inject('rootStore')(observer(Team));
