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
      justify-content: center;
      width: 130px;
      margin-left: 110px;
      height: 25px;
      align-items: center;
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

  return (
    <div>
      <Table>
        <tr>
          <th>Team invitations</th>
        </tr>
        {profileStore.pendingInvitations.map(invitation => (
          <tr>
            <StyledLink
              to={`/${
                gamesStore.games.find(game => game.id === invitation.game.id)
                  .name
              }/teams/${invitation.team.id}`}
            >
              <td>{invitation.team.name}</td>
            </StyledLink>
            <td>
              <AcceptButton
                onClick={() =>
                  profileStore.acceptInvite(invitation.id, 'accepted')
                }
                color={appStore.theme.secondary}
              >
                Accept
              </AcceptButton>
            </td>
            <td>
              <AcceptButton
                onClick={() =>
                  profileStore.acceptInvite(invitation.id, 'refused')
                }
                color={appStore.theme.error}
              >
                Reject
              </AcceptButton>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default inject('rootStore')(observer(PendingInvitations));
