import React from 'react';
import { observer } from 'mobx-react';

const Alert = props => {
  const { appStore, alertStore } = props.rootStore;
  return (
    <div>
      <h1>Halaaaa you has error bish</h1>
      <p>{this.errorMessage}</p>
    </div>
  );
};

export default observer(Alert);
