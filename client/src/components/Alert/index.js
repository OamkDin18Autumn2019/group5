import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const MainStyle = styled.div`
  width: 30%;
  text-align: center;
`;

const AlertBox = styled.section`
  background-color: #e8807d;
  padding: 4em;
`;

const AlertText = styled.div`
  font-family: Arial;
  color: #fff;
  font-size: 150%;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.05em 0.75em;
  border: 1px solid black;
  border-radius: 3px;
`;

const Paragraph = styled.p`
  display: inline;
`;

const Alert = props => {
  const { alertStore } = props.rootStore;
  console.log(alertStore);

  const handleClick = () => {
    alertStore.alertOpen = false;
    console.log(alertStore);
  };

  return (
    <MainStyle>
      <AlertBox>
        <AlertText>
          <Paragraph>{alertStore.message}</Paragraph>
          <Button onClick={handleClick}>X</Button>
        </AlertText>
      </AlertBox>
    </MainStyle>
  );
};

export default observer(Alert);
