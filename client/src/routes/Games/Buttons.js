import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Buttons = props => {
  const { teamStore } = props.rootStore;

  const StyledText = styled.p`
    text-decoration: none;
    width: 80px;
    margin-bottom: 7px;
    height: 40px;
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
    text-align: center;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 3%;
  `;

  const Styled = styled.div`
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  `;

  const getTeamData = async () => {
    await teamStore.getTeamDataById();
  };

  return (
    <Styled>
      <StyledText>Play </StyledText>
      <Link to="/teams-page" onClick={getTeamData}>
        <StyledText>Search Teams</StyledText>
      </Link>
    </Styled>
  );
};

export default inject('rootStore')(observer(Buttons));
