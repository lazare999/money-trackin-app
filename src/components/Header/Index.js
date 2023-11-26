import React from 'react'

import dollarSign from '../../images/dollar-sign.png';

import classes from './Header.module.css';

const Header = () => {
  const user = localStorage.getItem("userName")

  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <h1 className={classes.homePageHeader}>
          Money Tracking App <img src={dollarSign} alt="dollar-sign" className={classes.img} />
        </h1>
        <h1 className={classes.header}>Your Expens</h1>
        <h2 className={classes.user}>User: <span className={classes.boldUser}>{user}</span></h2>
      </div>
      {/* <hr /> */}
    </div>
  )
}

export default Header