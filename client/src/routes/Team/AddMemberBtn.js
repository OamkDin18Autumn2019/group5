import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const AddButton = styled.button`
  text-decoration: none;
  width: 150px;
  height: 25px;
  font-size: 16px;
  background: #7de88c;
  border: none;
  color: #fff;
  font-weight: 650;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  padding: 0;
  margin: 0;
  margin-top: 0px;
  margin-left: 500px;
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
`;

const AddMemberBtn = props => {
  return <AddButton>+ Add Member</AddButton>;
};

export default inject('rootStore')(observer(AddMemberBtn));
