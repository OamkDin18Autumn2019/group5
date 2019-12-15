import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Table = styled.table``;

const TableHead = styled.th``;

const TableData = styled.td``;

const FeaturedTournaments = props => {
  const { appStore, gamesStore } = props.rootStore;

  return (
    <Table>
      <TableHead />
      <tbody>
        <tr>
          <TableData>Featured Tournaments</TableData>
        </tr>
        {/* {list.map(tournament => (
          <tr>
            <TableData>{}</TableData>
            <TableData>{}</TableData>
            <TableData>{}</TableData>
            <TableData>{}</TableData>
          </tr>
        ))} */}

        <tr>
          <TableData>Starts in</TableData>
          <TableData>testiturnaus</TableData>
          <TableData>Peli</TableData>
          <TableData>0/64</TableData>
        </tr>
      </tbody>
    </Table>
  );
};

export default inject('rootStore')(observer(FeaturedTournaments));
