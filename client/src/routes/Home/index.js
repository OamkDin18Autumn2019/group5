import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import style from './index.module.css';
import bgImg from '../../TI8.jpg';

const Home = props => {
  const { appStore } = props.rootStore;
  const sectionStyle = {
    backgroundImage: `url(${bgImg})`
  };
  return (
    <div>
      <div className={style.mainContainer}>
        <div style={sectionStyle} className={style.backgroundImg}>
          <div className={style.logoContainer}>
            <h1>Global e-Sports</h1>
            <Link to="/login">
              <button>
                <span>Login</span>
              </button>
            </Link>
            <Link to="/register">
              <button>
                <span>Register</span>
              </button>
            </Link>
            <div></div>
          </div>
          <div className={style.container}>
            <div className={style.btnContainer}>
              <Link to="/tournaments">
                <button>
                  <span>Tournaments</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject('rootStore')(observer(Home));
