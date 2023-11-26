import React from 'react'

import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.headerContainer}>
            <h1 className={classes.footerHeader}>Manage your epxenses!</h1>
            <h1 className={classes.footerAuthor}>Created by: <a href='https://www.instagram.com/lazare.osiashvili9/' className={classes.footerLink}>$LaZaRe$!</a></h1>
        </div>
    )
}

export default Footer