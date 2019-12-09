import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const MainStyle = styled.div`
  width: 30%;
  text-align: center;
`;

const AlertBox = styled.section`
  background-color: ${({ color }) => color};
  padding: 4em;
`;

const AlertText = styled.div`
  font-family: Arial;
  color: #fff;
  font-size: 150%;
`;

const CloseButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.05em 0.75em;
  border: 1px solid black;
  border-radius: 3px;
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
    <MainStyle>
      <AlertBox color={alertStore.color}>
        <AlertText>
          <Message>{alertStore.message}</Message>
          <CloseButton onClick={() => alertStore.close()}>X</CloseButton>
        </AlertText>
      </AlertBox>
    </MainStyle>
  );
};

export default observer(Alert);
