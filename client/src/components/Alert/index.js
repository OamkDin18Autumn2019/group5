import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const StyledAlert = styled.div`
  position: absolute;
  box-shadow: black 2px 2px 5px;
  z-index: 3000;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  text-align: center;
  padding: 5px;
  background-color: ${({ color }) => color};
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;
    width: 290px;
    font-size 24px;
  }
`;

const AlertText = styled.div`
  font-family: Roboto, sans-serif;
  color: #fff;
`;

const CloseButton = styled.button`
  float: right;
  font-size: 1em;
  padding: 0.05em 0.75em;
  border: 1px solid black;
  border-radius: 3px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;
    font-size 24px;
  }
`;

const Message = styled.p`
  display: inline;
`;

const Alert = props => {
  const { alertStore } = props.rootStore;

  useEffect(() => {
    const timer = setTimeout(() => {
      alertStore.close();
    }, alertStore.duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledAlert color={alertStore.color}>
      <AlertText>
        <Message>{alertStore.message}</Message>
        <CloseButton onClick={() => alertStore.close()}>X</CloseButton>
      </AlertText>
    </StyledAlert>
  );
};

export default observer(Alert);
