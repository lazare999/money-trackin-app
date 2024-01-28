import React from 'react'
import { useNavigate } from 'react-router-dom';

// import dollarSign from '../../../public/images/dollar-sign.png';

import classes from './Header.module.css';

const Header = () => {
  const user = localStorage.getItem("userName")
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const navigateHandler = () => {
    navigate('/main')
  }

  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <h1 className={classes.homePageHeader} onClick={navigateHandler} title='click and navigate main page'>
          Money Tracking App <img src={process.env.PUBLIC_URL + '/images/dollar-sign.svg'} alt="dollar-sign" className={classes.dollarIcon} />
        </h1>
        <h1 className={classes.header}>Your Expens</h1>
        <h2 className={classes.user}>User: <span className={classes.boldUser}>{user}</span><img src={process.env.PUBLIC_URL + '/images/sign-out.svg'} alt='sign-out icon' title='sign out' className={classes.signOutIcon} onClick={handleLogout}/></h2>
      </div>
      {/* <hr /> */}
    </div>
  )
}

export default Header