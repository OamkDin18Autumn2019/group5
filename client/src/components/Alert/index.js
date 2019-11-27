import React from 'react';
import { observer } from 'mobx-react';

const Alert = props => {
  const { alertStore } = props.rootStore;
  return (
    <div>
      <p>{alertStore.message}</p>
    </div>
  );
};

export default observer(Alert);
