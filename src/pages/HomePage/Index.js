import React from 'react'
import { useSearchParams } from 'react-router-dom';

import dollarSign from '../../images/dollar-sign.png';
import SingIn from '../Auth/SignIn/Index.js';
import SingUp from '../Auth/SignUp/Index.js';

import classes from './HomePage.module.css';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <div className={classes.background}>
      <div className={classes.headerContainer}>
        <h1 className={classes.homePageHeader}>
          Money Tracking App <img src={dollarSign} alt="dollar-sign" className={classes.img} />
        </h1>
        { isLogin ? <SingIn /> : <SingUp /> }
      </div>
    </div>
  )
}

export default HomePage;