import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Table = styled.table`
  // border: 1px solid white;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  color: #fff;
  width: 35%;
  height: 50px;
  vertical-align: top;
  padding: 5px;
`;

const FeaturedTournaments = props => {
  const { appStore, gamesStore } = props.rootStore;

  return (
    <Table>
      <tbody>
        <TableRow>
          <TableData>Featured Tournaments</TableData>
        </TableRow>
        {/* {list.map(tournament => (
          <TableRow>
            <TableData>{}</TableData>
            <TableData>{}</TableData>
            <TableData>{}</TableData>
            <TableData>{}</TableData>
          </TableRow>
        ))} */}

        <TableRow>
          <TableData>Starts in</TableData>
          <TableData>testiturnaus</TableData>
          <TableData>Peli</TableData>
          <TableData>0/64</TableData>
        </TableRow>
        <TableRow>
          <TableData>Starts in</TableData>
          <TableData>testiturnaus</TableData>
          <TableData>Peli</TableData>
          <TableData>0/64</TableData>
        </TableRow>
      </tbody>
    </Table>
  );
};

export default inject('rootStore')(observer(FeaturedTournaments));
