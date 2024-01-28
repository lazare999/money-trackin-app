import React from 'react'

import classes from './Footer.module.css'

const Footer = ({ specialStyle }) => {
    const containerClassName = specialStyle
        ? `${classes.headerContainer} ${classes.mainPageFooter}`
        : classes.headerContainer;

    return (
        <div className={containerClassName}>
            <h1 className={classes.footerHeader}>Manage your epxenses!</h1>
            <h1 className={classes.footerAuthor}>Created by: <a href='https://www.instagram.com/lazare.osiashvili9/' className={classes.footerLink}>$LaZaRe$!</a></h1>
        </div>
    )
}

export default Footer