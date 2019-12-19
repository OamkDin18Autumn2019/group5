import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PendingInvitations = props => {
  const { appStore, profileStore, gamesStore } = props.rootStore;

  const Table = styled.table``;

  const AcceptButton = styled.button`
    text-decoration: none;
    width: 55px;
    height: 25px;
    font-size: 16px;
    background-color: ${({ color }) => color};
    border: none;
    color: #fff;
    transition: 0.1s ease;
    cursor: pointer;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    padding: 0;
    margin: 0;
    font-family: Robot, Sans-serif;
    margin-top: 0px;
    margin-left: 15px;
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
      display: flex;
      flex-direction: column;
      width: 80px;
      height: 25px;
      align-items: center;
    }
  `;

  const TD = styled.td`
    @media (max-width: 700px) {
      width: 100px;
      margin-left: 0px;
      height: 25px;
    }
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    widht: 100%;
    border: none;
    color: #fff;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    cursor: pointer;
    padding: 0;
    margin: 10px;
    margin-bottom: 0;
  `;

  const SubTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10px 0 15px 0;
  font-weight: 200;
  font-size: 20px;
  text-align: center;
  color: #fff;
  @media (max-width: 700px) {
    text-align: left;
    margin-bottom: 10px;
    width: 100px;
    display: flex;
    justify-content: flex-start;
    font-size 18px;
  }
`;

  return (
    <>
      <Table>
        <SubTitle>Team invitations</SubTitle>
        {profileStore.pendingInvitations.map(invitation => (
          <tr>
            <StyledLink
              to={`/${
                gamesStore.games.find(game => game.id === invitation.game.id)
                  .name
              }/teams/${invitation.team.id}`}
            >
              <TD>{invitation.team.name}</TD>
            </StyledLink>
            <TD>
              <AcceptButton
                onClick={() =>
                  profileStore.acceptInvite(invitation.id, 'accepted')
                }
                color={appStore.theme.secondary}
              >
                Accept
              </AcceptButton>
            </TD>
            <TD>
              <AcceptButton
                onClick={() =>
                  profileStore.acceptInvite(invitation.id, 'refused')
                }
                color={appStore.theme.error}
              >
                Reject
              </AcceptButton>
            </TD>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default inject('rootStore')(observer(PendingInvitations));
