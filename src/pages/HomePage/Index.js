import React from 'react'
import { useSearchParams, redirect } from 'react-router-dom';

import dollarSign from '../../images/dollar-sign.png';
import SingIn from '../../components/Auth/SignIn/Index';
import SingUp from '../../components/Auth/SignUp/Index';

import classes from './HomePage.module.css';
import Main from '../Main/Index';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <div className={classes.background}>
      <div className={classes.headerContainer}>
        <h1 className={classes.homePageHeader}>
          Money Tracking App <img src={dollarSign} alt="dollar-sign" className={classes.img} />
        </h1>
        {isLogin ? <SingIn /> : <SingUp />}
      </div>
    </div>
  )
}

export default HomePage;

export const checkAuthLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect('/')
  } else {
    return <Main />
  }
}