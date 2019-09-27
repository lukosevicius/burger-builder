import React, {Fragment} from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'

const Sidedrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
    
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
    }

    return (
        <Fragment>
            <Backdrop 
                show={props.open}
                cancel={props.toggle}/>
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
        
    )
};

export default Sidedrawer;