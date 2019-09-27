import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuButton from '../MenuButton/MenuButton';

const Toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <MenuButton toggle={props.toggle}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
};

export default Toolbar;