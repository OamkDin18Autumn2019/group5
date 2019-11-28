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
          <div className={style.navContainer}>
            <Link to="/counter-strike-global-offensive">
              <button>
                <img src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg" />
                <span>CS: GO</span>
              </button>
            </Link>
            <Link to="/dota2">
              <button>
                <img src="https://huntpng.com/images250/dota-2-logo-png-13.png" />
                <span>Dota 2</span>
              </button>
            </Link>
            <Link to="/league-of-legends">
              <button>
                <img
                  // src="https://i.pinimg.com/originals/6c/a8/a9/6ca8a97ae855a25e8abf4d67f88a8754.png"
                  src="https://lolstatic-a.akamaihd.net/riotbar/prod/1.6.706/images/navigation/icon-game-lol.png"
                />
                <span>League of Legends</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject('rootStore')(observer(Home));
