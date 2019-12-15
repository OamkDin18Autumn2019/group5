import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const ListTeams = props => {
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

  const Table = styled.table``;

  const TableData = styled.td``;
  console.log(teamStore.teams);

  return (
    <Section>
      <Table>
        <tbody>
          <tr>
            <TableData>Teams</TableData>
          </tr>
          {teamStore.teams.map(teams => (
            <tr>
              <TableData>{teams.name}</TableData>
              <TableData>Recruiting: </TableData>
              <TableData>{teams.recruiting}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
};

export default inject('rootStore')(observer(ListTeams));
