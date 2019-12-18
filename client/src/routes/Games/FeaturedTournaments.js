import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Table = styled.table`
  // border: 1px solid white;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 300;
  font-size: 28px;
  color: #fff;
  text-align: left;
  margin-bottom: 40px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  margin-top: 5px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const Tbody = styled.div`
  background: #32353d;
  padding: 40px;
  width: 50%;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: 80%;
  }
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  color: #fff;
  width: 35%;
  height: 20px;
  vertical-align: top;
  padding: 10px;
  padding-bottom: 0;
  border-bottom: solid 1px;
  @media (max-width: 700px) {
    font-size: 14px;
    width: 100%;
  }
`;

const FeaturedTournaments = props => {
  const { appStore, gamesStore } = props.rootStore;

  return (
    <Table>
      <Tbody>
        <TableRow>
          <Title>Featured Tournaments</Title>
        </TableRow>
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
      </Tbody>
    </Table>
  );
};

export default inject('rootStore')(observer(FeaturedTournaments));
