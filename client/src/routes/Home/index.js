import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './index.module.css';

const Home = props => {
  const { appStore } = props.rootStore;

  return (
    <div>
      <div>
        <h1>E-SPORTS PLATFORM</h1>
      </div>
      <div>
        <Link to="/register">
          <button>
            <span>Register</span>
          </button>
        </Link>
        <Link to="/login">
          <button>
            <span>Login</span>
          </button>
        </Link>
        <Link to="/">
          <button>
            <span>Tournaments</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default inject('rootStore')(observer(Home));
